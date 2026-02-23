/**
 * Data layer for blog posts — Sanity-first, JSON fallback.
 */
import postsData from '@/data/posts.json';
import type { BlogPost } from '@/types';
import {
  isSanityConfigured,
  sanityGetAllPosts,
  sanityGetPostBySlug,
  type SanityPost,
} from './sanity/queries';
import { urlForImageStr } from './sanity/image';

// ─── Mapper ───────────────────────────────────────────────────────────────────

function toPost(s: SanityPost): BlogPost {
  return {
    id: 0,
    title: s.title,
    slug: s.slug,   // already a string from GROQ projection
    content: '',
    excerpt: s.excerpt ?? '',
    date: s.publishedAt ? s.publishedAt.slice(0, 10) : '',
    seoTitle: s.seo?.metaTitle ?? s.title,
    seoDescription: s.seo?.metaDescription ?? '',
    image: s.coverImage ? urlForImageStr(s.coverImage) : '',
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<BlogPost[]> {
  if (isSanityConfigured) {
    const data = await sanityGetAllPosts();
    if (data.length > 0) return data.map(toPost);
  }
  return postsData as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (isSanityConfigured) {
    const p = await sanityGetPostBySlug(slug);
    if (p) return toPost(p);
  }
  return (postsData as BlogPost[]).find((p) => p.slug === slug);
}
