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
import { normalizeProductSlug } from './productSlug';

// ─── Mappers ──────────────────────────────────────────────────────────────────

function normalizeProduct(product: Product): Product | null {
  const slug = normalizeProductSlug(product.slug);
  return slug ? { ...product, slug } : null;
}

export function toProduct(s: SanityProduct): Product | null {
  const slug = normalizeProductSlug(s.slug);
  if (!slug) return null;

  return {
    id: 0,
    title: s.title,
    slug,
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

function isProduct(product: Product | null): product is Product {
  return product !== null;
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
    if (data.length > 0) return data.map(toProduct).filter(isProduct);
  }
  return (productsData as Product[]).map(normalizeProduct).filter(isProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const canonicalSlug = normalizeProductSlug(slug);
  if (!canonicalSlug) return undefined;

  if (isSanityConfigured) {
    for (const candidate of new Set([canonicalSlug, slug])) {
      const product = await sanityGetProductBySlug(candidate);
      if (product) {
        const normalized = toProduct(product);
        if (normalized?.slug === canonicalSlug) return normalized;
      }
    }

    const product = (await sanityGetAllProducts())
      .map(toProduct)
      .filter(isProduct)
      .find((item) => item.slug === canonicalSlug);
    if (product) return product;
  }

  return (productsData as Product[])
    .map(normalizeProduct)
    .filter(isProduct)
    .find((product) => product.slug === canonicalSlug);
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
