import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOG_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'blog');

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Block path traversal
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const ext = path.extname(filename).toLowerCase();
  const mime = MIME[ext];
  if (!mime) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const filepath = path.join(BLOG_IMAGES_DIR, filename);

  // Hard backstop, independent of the substring blocklist above: the
  // resolved file must live directly inside BLOG_IMAGES_DIR, never in a
  // parent or nested directory.
  if (path.dirname(path.resolve(filepath)) !== path.resolve(BLOG_IMAGES_DIR)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  if (!fs.existsSync(filepath)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const file = fs.readFileSync(filepath);

  return new NextResponse(file, {
    status: 200,
    headers: {
      'Content-Type': mime,
      'Cache-Control': 'public, max-age=2592000, immutable',
    },
  });
}
