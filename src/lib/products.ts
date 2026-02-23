/**
 * Data layer — Sanity-first, JSON fallback.
 * All functions are async. When NEXT_PUBLIC_SANITY_PROJECT_ID is set and
 * Sanity returns data, it is used; otherwise the bundled JSON is returned.
 */
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import type { Product, Category } from '@/types';
import {
  isSanityConfigured,
  sanityGetAllProducts,
  sanityGetProductBySlug,
  sanityGetAllCategories,
  type SanityProduct,
  type SanityCategory,
} from './sanity/queries';
import { urlForImageStr } from './sanity/image';

// ─── Mappers ──────────────────────────────────────────────────────────────────

function toProduct(s: SanityProduct): Product {
  return {
    id: 0,
    title: s.title,
    slug: s.slug,                           // already a string from GROQ projection
    description: s.shortDescription ?? '',
    seoTitle: s.seo?.metaTitle ?? s.title,
    seoDescription: s.seo?.metaDescription ?? '',
    price: String(s.priceFrom ?? 0),
    categorySlug: s.category?.slug ?? '',   // already a string
    categoryName: s.category?.title ?? '',
    isAccessory: s.isAccessory ?? false,
    image: s.images?.[0] ? urlForImageStr(s.images[0]) : '',
  };
}

function toCategory(s: SanityCategory): Category {
  return {
    slug: s.slug,   // already a string
    name: s.title,
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  if (isSanityConfigured) {
    const data = await sanityGetAllProducts();
    if (data.length > 0) return data.map(toProduct);
  }
  return productsData as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (isSanityConfigured) {
    const p = await sanityGetProductBySlug(slug);
    if (p) return toProduct(p);
  }
  return (productsData as Product[]).find((p) => p.slug === slug);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => {
    try {
      return decodeURIComponent(p.categorySlug) === decodeURIComponent(categorySlug);
    } catch {
      return p.categorySlug === categorySlug;
    }
  });
}

export async function getFeaturedProducts(count = 4): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => !p.isAccessory).slice(0, count);
}

export async function getAllCategories(): Promise<Category[]> {
  if (isSanityConfigured) {
    const data = await sanityGetAllCategories();
    if (data.length > 0) return data.map(toCategory);
  }
  return categoriesData as Category[];
}
