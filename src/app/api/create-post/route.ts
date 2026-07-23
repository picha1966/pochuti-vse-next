import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';
import { checkPublishAuth } from '@/lib/publishAuth';

// Simple mutex for file write operations
let writeLock = false;
async function acquireLock(): Promise<boolean> {
  const maxAttempts = 50;
  let attempts = 0;
  while (writeLock && attempts < maxAttempts) {
    await new Promise((r) => setTimeout(r, 10));
    attempts++;
  }
  if (writeLock) return false;
  writeLock = true;
  return true;
}
function releaseLock() {
  writeLock = false;
}

type Post = {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  image: string;
  _id: string;
};

const MAX_POSTS = 50;
const MIN_TITLE_LENGTH = 20;
const MIN_CONTENT_LENGTH = 200;

// Declared Content-Length above this is rejected before the body is ever
// read. This only catches a truthful/present header — the post-parse field
// limits below are the real backstop when Content-Length is absent or lies.
const MAX_BODY_BYTES = 1024 * 1024; // 1 MiB

// Explicit upper bounds for every field the request body may contain.
// metaTitle/metaDescription/keywords are accepted-but-unused by this route
// today (see body destructuring below) — still capped here so an oversized
// value can't inflate the parsed payload for no reason.
const FIELD_LIMITS: Record<string, number> = {
  title: 300,
  slug: 200,
  excerpt: 1000,
  content: 200_000,
  metaTitle: 300,
  metaDescription: 500,
  keywords: 500,
  image: 500,
};

function cleanTitle(title: string): string {
  let cleaned = title;
  // Remove patterns like (123456789), [123], {123}
  cleaned = cleaned.replace(/[\(\[\{]\d+[\}\]\)]/g, '');
  // Remove standalone 10+ digit numbers (timestamps/IDs)
  cleaned = cleaned.replace(/\b\d{10,}\b/g, '');
  // Collapse multiple spaces
  cleaned = cleaned.replace(/\s+/g, ' ');
  return cleaned.trim();
}

function hasGarbageTitle(title: string): boolean {
  // Check for remaining ID patterns
  if (/\(\d+\)/.test(title)) return true;
  if (/\[\d+\]/.test(title)) return true;
  if (/\{\d+\}/.test(title)) return true;
  if (/\b\d{8,}\b/.test(title)) return true; // 8+ digit numbers
  return false;
}

function generateSlug(title: string): string {
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ie',
    ж: 'zh', з: 'z', и: 'y', і: 'i', ї: 'i', й: 'i', к: 'k', л: 'l',
    м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
    ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ь: '',
    ю: 'iu', я: 'ia',
  };

  return title
    .toLowerCase()
    .split('')
    .map((char) => map[char] ?? char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function generateExcerpt(content: string, maxLength = 160): string {
  const plain = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return plain.length > maxLength ? plain.slice(0, maxLength).trim() + '...' : plain;
}

function ensureUniqueSlug(posts: Post[], baseSlug: string): string {
  const slugs = new Set(posts.map((post) => post.slug));
  if (!slugs.has(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;
  let nextSlug = `${baseSlug}-${counter}`;

  while (slugs.has(nextSlug)) {
    counter += 1;
    nextSlug = `${baseSlug}-${counter}`;
  }

  return nextSlug;
}

function slugExists(posts: Post[], slug: string): boolean {
  return posts.some((p) => p.slug === slug);
}

function normalizeTitleForCompare(title: string): string {
  return cleanTitle(title).toLowerCase().trim().replace(/\s+/g, ' ');
}

function titleExists(posts: Post[], title: string): boolean {
  const normalized = normalizeTitleForCompare(title);
  return posts.some((p) => normalizeTitleForCompare(p.title) === normalized);
}

function normalizeImagePath(image: string): string {
  if (!image || typeof image !== 'string') return '';
  try {
    return new URL(image).pathname;
  } catch {
    return image;
  }
}

function isValidImagePath(image: string): boolean {
  if (!image || typeof image !== 'string') return false;
  const p = normalizeImagePath(image);
  if (!p.startsWith('/images/blog/')) return false;
  if (!/\.(png|jpg|jpeg|webp)$/i.test(p)) return false;
  return true;
}

/**
 * True only when Content-Length is present, well-formed, and declares a
 * size over the limit. A missing or malformed header returns false here —
 * it is not proof the body is small, just not a basis for rejection at
 * this stage. Post-parse field limits are the real backstop.
 */
function contentLengthExceeds(request: NextRequest, maxBytes: number): boolean {
  const raw = request.headers.get('content-length');
  if (!raw) return false;
  const declared = Number(raw);
  if (!Number.isFinite(declared) || declared < 0) return false;
  return declared > maxBytes;
}

/**
 * Validates every known field's type and length against FIELD_LIMITS.
 * Returns a short error string on the first violation, or null if the
 * body is a well-formed object with no field over its limit. Does not
 * enforce which fields are required — that's still the existing
 * `!title || !content` check below, unchanged.
 */
function validateFieldLimits(body: unknown): string | null {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return 'request body must be a JSON object';
  }
  const record = body as Record<string, unknown>;
  for (const [field, max] of Object.entries(FIELD_LIMITS)) {
    const value = record[field];
    if (value === undefined || value === null) continue;
    if (typeof value !== 'string') {
      return `${field} must be a string`;
    }
    if (value.length > max) {
      return `${field} exceeds maximum length`;
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  // === a. server configuration + b. Authorization — before anything else,
  // including the mutex and JSON parsing (see docs: auth must run before
  // acquireLock/request.json/fs). ===
  const auth = checkPublishAuth(request.headers.get('authorization'));
  if (!auth.ok) {
    if (auth.status === 503) {
      return NextResponse.json(
        { error: 'publishing temporarily unavailable' },
        { status: 503, headers: { 'Cache-Control': 'no-store' } }
      );
    }
    return NextResponse.json(
      { error: 'unauthorized' },
      {
        status: 401,
        headers: {
          'Cache-Control': 'no-store',
          'WWW-Authenticate': 'Bearer',
        },
      }
    );
  }

  // === c. Content-Length — still before the mutex and before the body is
  // read. ===
  if (contentLengthExceeds(request, MAX_BODY_BYTES)) {
    return NextResponse.json(
      { error: 'payload too large' },
      { status: 413, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  // === d. mutex (unchanged) ===
  const lockAcquired = await acquireLock();
  if (!lockAcquired) {
    return NextResponse.json(
      { success: false, error: 'failed to acquire write lock' },
      { status: 503 }
    );
  }

  try {
    // === e. parse JSON (unchanged) ===
    const body = await request.json();

    // Post-parse field limits — the backstop for when Content-Length was
    // absent or untruthful. Runs before the existing destructuring so an
    // oversized/mistyped field never reaches the write path.
    const fieldLimitError = validateFieldLimits(body);
    if (fieldLimitError) {
      return NextResponse.json(
        { success: false, error: fieldLimitError },
        { status: 400 }
      );
    }

    const payload = body ?? {};
    let { title, content, image } = payload;
    const { slug, excerpt } = payload;

    // === f. existing VALIDATION (unchanged) ===
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'title and content are required' },
        { status: 400 }
      );
    }

    title = String(title).trim();
    content = String(content)
      .trim()
      .replace(/\n+/g, ' ')           // Replace newlines with space
      .replace(/\s+/g, ' ')          // Collapse multiple spaces
      .trim();

    // Clean title
    title = cleanTitle(title);

    // Check minimum lengths
    if (title.length < MIN_TITLE_LENGTH) {
      return NextResponse.json(
        { success: false, error: `title must be at least ${MIN_TITLE_LENGTH} characters` },
        { status: 400 }
      );
    }

    if (content.length < MIN_CONTENT_LENGTH) {
      return NextResponse.json(
        { success: false, error: `content must be at least ${MIN_CONTENT_LENGTH} characters` },
        { status: 400 }
      );
    }

    // Check for garbage in title
    if (hasGarbageTitle(title)) {
      return NextResponse.json(
        { success: false, error: 'title contains invalid characters (ID numbers)' },
        { status: 400 }
      );
    }

    // Validate image
    if (!isValidImagePath(image)) {
      return NextResponse.json(
        { success: false, error: 'valid image path (/images/blog/...) is required' },
        { status: 400 }
      );
    }
    // Normalize full URL → relative path
    image = normalizeImagePath(image);

    // === SAFE FILE READ ===
    const postsFilePath = path.join(process.cwd(), 'src', 'data', 'posts.json');

    let posts: Post[] = [];
    try {
      if (fs.existsSync(postsFilePath)) {
        const fileContent = fs.readFileSync(postsFilePath, 'utf-8').trim();
        posts = fileContent ? JSON.parse(fileContent) : [];
        if (!Array.isArray(posts)) posts = [];
      }
    } catch (e) {
      console.error('[create-post] Error reading posts.json:', e);
      posts = [];
    }

    // === DUPLICATE CHECKS ===
    const baseSlug = typeof slug === 'string' && slug.trim() ? slug.trim() : generateSlug(title);
    const finalSlug = ensureUniqueSlug(posts, baseSlug);

    if (slugExists(posts, finalSlug)) {
      return NextResponse.json(
        { success: false, error: 'post with this slug already exists' },
        { status: 409 }
      );
    }

    if (titleExists(posts, title)) {
      return NextResponse.json(
        { success: false, error: 'post with this title already exists' },
        { status: 409 }
      );
    }

    // === CREATE POST ===
    const newPost: Post = {
      title,
      slug: finalSlug,
      content,
      excerpt: typeof excerpt === 'string' && excerpt.trim()
        ? excerpt.trim()
        : generateExcerpt(content),
      date: new Date().toISOString(),
      image,
      _id: finalSlug,
    };

    posts.unshift(newPost);

    // === LIMIT POSTS ===
    if (posts.length > MAX_POSTS) {
      posts = posts.slice(0, MAX_POSTS);
    }

    // === SAFE FILE WRITE ===
    try {
      fs.mkdirSync(path.dirname(postsFilePath), { recursive: true });
      fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
    } catch (e) {
      console.error('[create-post] Error writing posts.json:', e);
      return NextResponse.json(
        { success: false, error: 'failed to save post' },
        { status: 500 }
      );
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${finalSlug}`);

    return NextResponse.json({
      success: true,
      slug: finalSlug,
    });
  } catch (error) {
    console.error('[create-post] error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    releaseLock();
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}