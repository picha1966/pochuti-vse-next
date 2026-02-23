import type { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products';
import { getAllPosts } from '@/lib/posts';

const BASE = 'https://sluh-apparat.vn.ua';

const DATES = {
  homepage: new Date('2026-02-01'),
  catalog: new Date('2026-02-01'),
  cityPages: new Date('2025-11-01'),
  commercialPages: new Date('2025-11-01'),
  servicePages: new Date('2026-02-22'),
  blog: new Date('2026-02-01'),
  products: new Date('2025-10-01'),
  posts: new Date('2026-02-01'),
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const posts = await getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                                          lastModified: DATES.homepage,         changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/catalog`,                             lastModified: DATES.catalog,          changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/vinnytsia`,                           lastModified: DATES.cityPages,        changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/khmelnytskyi`,                        lastModified: DATES.cityPages,        changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/kupyty-sluhovyi-aparat-vinnytsia`,    lastModified: DATES.commercialPages,  changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/kupyty-sluhovyi-aparat-khmelnytskyi`, lastModified: DATES.commercialPages,  changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/nalashtuvannya-sluhovoho-aparata`,    lastModified: DATES.servicePages,     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/perevirka-slukhu-vinnytsia`,          lastModified: DATES.servicePages,     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/perevirka-slukhu-khmelnytskyi`,       lastModified: DATES.servicePages,     changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/blog`,                                lastModified: DATES.blog,             changeFrequency: 'weekly',  priority: 0.7 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/catalog/${p.slug}`,
    lastModified: DATES.products,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: DATES.posts,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...postRoutes];
}
