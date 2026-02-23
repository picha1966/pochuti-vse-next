import { groq } from 'next-sanity';
import { serverClient, isSanityConfigured } from './client';

export { isSanityConfigured } from './client';

// ─── Types ───────────────────────────────────────────────────────────────────

// Note: GROQ projections use `"slug": slug.current` so slug is a plain string
export interface SanityCategory {
  _id: string;
  _type: 'category';
  title: string;
  slug: string;       // projected as string via "slug": slug.current
  sortOrder: number;
}

export interface SanityImage {
  _key?: string;
  asset: { _ref: string; _type: 'reference' };
  alt?: string;
}

export interface SanityProduct {
  _id: string;
  _type: 'product';
  title: string;
  slug: string;       // projected as string via "slug": slug.current
  brand?: string;
  shortDescription?: string;
  description?: unknown[];
  priceFrom: number;
  priceNote?: string;
  category?: SanityCategory;
  images?: SanityImage[];
  features?: string[];
  specs?: {
    type?: string;
    channels?: string;
    hearingLoss?: string;
    battery?: string;
    warranty?: string;
  };
  isAccessory: boolean;
  isActive: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
  };
}

export interface SanityPost {
  _id: string;
  _type: 'post';
  title: string;
  slug: string;       // projected as string via "slug": slug.current
  excerpt?: string;
  coverImage?: SanityImage & { alt?: string };
  content?: unknown[];
  publishedAt?: string;
  cityTarget?: 'both' | 'vinnytsia' | 'khmelnytskyi';
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
  };
}

// ─── GROQ Queries ──────────────────────────────────────────────────────────

const categoryFields = groq`_id, title, "slug": slug.current, sortOrder`;

const productFields = groq`
  _id, title, "slug": slug.current, brand,
  shortDescription, description,
  priceFrom, priceNote,
  "category": category->{${categoryFields}},
  images[]{ _key, asset, alt },
  features, specs,
  isAccessory, isActive,
  seo{ metaTitle, metaDescription, ogImage }
`;

const postFields = groq`
  _id, title, "slug": slug.current, excerpt,
  coverImage{ asset, alt },
  content, publishedAt, cityTarget,
  seo{ metaTitle, metaDescription, ogImage }
`;

// ─── Query Strings (exported for generateStaticParams) ────────────────────

export const getAllProductsQuery = groq`
  *[_type == "product" && isActive == true] | order(title asc) { ${productFields} }
`;

export const getProductBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] { ${productFields} }
`;

export const getAllCategoriesQuery = groq`
  *[_type == "category"] | order(sortOrder asc, title asc) { ${categoryFields} }
`;

export const getAllPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) { ${postFields} }
`;

export const getPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] { ${postFields} }
`;

// ─── Fetch Functions ───────────────────────────────────────────────────────

const REVALIDATE = 3600; // 1 hour

export async function sanityGetAllProducts(): Promise<SanityProduct[]> {
  if (!isSanityConfigured) return [];
  return serverClient.fetch(getAllProductsQuery, {}, { next: { revalidate: REVALIDATE } });
}

export async function sanityGetProductBySlug(slug: string): Promise<SanityProduct | null> {
  if (!isSanityConfigured) return null;
  return serverClient.fetch(getProductBySlugQuery, { slug }, { next: { revalidate: REVALIDATE } });
}

export async function sanityGetAllCategories(): Promise<SanityCategory[]> {
  if (!isSanityConfigured) return [];
  return serverClient.fetch(getAllCategoriesQuery, {}, { next: { revalidate: REVALIDATE } });
}

export async function sanityGetAllPosts(): Promise<SanityPost[]> {
  if (!isSanityConfigured) return [];
  return serverClient.fetch(getAllPostsQuery, {}, { next: { revalidate: REVALIDATE } });
}

export async function sanityGetPostBySlug(slug: string): Promise<SanityPost | null> {
  if (!isSanityConfigured) return null;
  return serverClient.fetch(getPostBySlugQuery, { slug }, { next: { revalidate: REVALIDATE } });
}
