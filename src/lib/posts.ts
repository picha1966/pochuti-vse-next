/**
 * Data layer for blog posts - Sanity-first, JSON fallback.
 */
import fs from 'fs';
import path from 'path';
import type { BlogPost } from '@/types';
import {
  isSanityConfigured,
  sanityGetAllPosts,
  sanityGetPostBySlug,
  type SanityPost,
} from './sanity/queries';
import { urlForImageStr } from './sanity/image';


function sanitizeError(error: unknown): { name: string; message: string } {
  if (!(error instanceof Error)) {
    return { name: 'UnknownError', message: 'non-error exception' };
  }

  const message = error.message
    .replace(/https?:\/\/\S+/g, '[url]')
    .replace(/[A-Za-z0-9_=-]{32,}/g, '[redacted]')
    .slice(0, 160);

  return { name: error.name || 'Error', message };
}

function warnFallback(operation: string, source: 'sanity' | 'json', error: unknown): void {
  console.warn('[posts] using JSON fallback', {
    operation,
    source,
    error: sanitizeError(error),
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function slugValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (isRecord(value) && typeof value.current === 'string') return value.current;
  return '';
}

function safeDecodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function slugCandidates(slug: string): string[] {
  const decoded = safeDecodeSlug(slug);
  return decoded === slug ? [slug] : [decoded, slug];
}

function toPost(sanityPost: SanityPost): BlogPost {
  const post = {
    id: 0,
    _id: sanityPost._id,
    title: sanityPost.title,
    slug: sanityPost.slug,
    content: '',
    excerpt: sanityPost.excerpt ?? '',
    date: sanityPost.publishedAt ? sanityPost.publishedAt.slice(0, 10) : '',
    seoTitle: sanityPost.seo?.metaTitle ?? sanityPost.title,
    seoDescription: sanityPost.seo?.metaDescription ?? '',
    image: sanityPost.coverImage ? urlForImageStr(sanityPost.coverImage) : '',
    imageAlt: sanityPost.coverImage?.alt ?? '',
    publishedAt: sanityPost.publishedAt ?? null,
  };

  return post as BlogPost;
}

function toJsonPost(value: unknown, index: number): BlogPost | null {
  if (!isRecord(value)) return null;

  const slug = slugValue(value.slug);
  const title = stringValue(value.title);
  if (!slug || !title) return null;

  const id = typeof value.id === 'number' ? value.id : index + 1;
  const date = stringValue(value.date);
  const image = stringValue(value.image);
  const post = {
    id,
    _id: stringValue(value._id) || String(id),
    title,
    slug,
    content: stringValue(value.content),
    excerpt: stringValue(value.excerpt),
    date,
    seoTitle: stringValue(value.seoTitle) || title,
    seoDescription: stringValue(value.seoDescription),
    image,
    imageAlt: stringValue(value.imageAlt),
    author: stringValue(value.author) || undefined,
    category: stringValue(value.category) || undefined,
    publishedAt: stringValue(value.publishedAt) || date || null,
    mainImage: isRecord(value.mainImage) ? value.mainImage : undefined,
  };

  return post as BlogPost;
}

function loadJsonPosts(operation: string): BlogPost[] {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'posts.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data: unknown = JSON.parse(fileContent);

    if (!Array.isArray(data)) return [];

    return data
      .map((item, index) => toJsonPost(item, index))
      .filter((post): post is BlogPost => Boolean(post));
  } catch (error) {
    warnFallback(operation, 'json', error);
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (isSanityConfigured) {
    let posts: unknown;

    try {
      posts = await sanityGetAllPosts();
    } catch (error) {
      warnFallback('getAllPosts', 'sanity', error);
      return loadJsonPosts('getAllPosts');
    }

    if (!Array.isArray(posts) || posts.length === 0) {
      return loadJsonPosts('getAllPosts');
    }

    return posts.map(toPost);
  }

  return loadJsonPosts('getAllPosts');
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const [normalizedSlug] = slugCandidates(slug);

  if (isSanityConfigured) {
    let post: SanityPost | null;

    try {
      post = await sanityGetPostBySlug(normalizedSlug);
    } catch (error) {
      warnFallback('getPostBySlug', 'sanity', error);
      const posts = loadJsonPosts('getPostBySlug');
      const candidates = slugCandidates(slug);

      return posts.find((jsonPost) => candidates.includes(jsonPost.slug));
    }

    if (post) return toPost(post);
  }

  const posts = loadJsonPosts('getPostBySlug');
  const candidates = slugCandidates(slug);

  return posts.find((post) => candidates.includes(post.slug));
}
