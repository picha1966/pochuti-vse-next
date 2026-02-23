/**
 * Migration script: JSON → Sanity
 *
 * Reads src/data/products.json and src/data/posts.json,
 * then uploads:
 *   1. Categories (deduped)
 *   2. Products (with remote image download + re-upload to Sanity)
 *   3. Posts
 *
 * Usage:
 *   node scripts/migrate-to-sanity.js
 *   (or) npm run sanity:migrate
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=...
 *   NEXT_PUBLIC_SANITY_DATASET=production
 *   SANITY_WRITE_TOKEN=...   ← needs write permissions (Editor or higher)
 */

const { createClient } = require('@sanity/client');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');

// ── Load env ──────────────────────────────────────────────────────────────────
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token     = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('\n❌  Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local\n');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false });

// ── Load JSON data ─────────────────────────────────────────────────────────────
const productsJson = require('../src/data/products.json');
const postsJson    = require('../src/data/posts.json');

// ── Helper: download & upload image to Sanity ─────────────────────────────────
function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function uploadImage(url, filename) {
  if (!url || !url.startsWith('http')) return null;
  try {
    console.log(`    ↑ Uploading image: ${filename}`);
    const buf = await fetchBuffer(url);
    const ext = path.extname(filename).replace('.', '') || 'jpg';
    const asset = await client.assets.upload('image', buf, {
      filename,
      contentType: `image/${ext === 'png' ? 'png' : 'jpeg'}`,
    });
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.warn(`    ⚠️  Image upload failed for ${url}: ${err.message}`);
    return null;
  }
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\wа-яёіїєґ\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

// ── 1. Migrate categories ──────────────────────────────────────────────────────
async function migrateCategories() {
  console.log('\n📁 Migrating categories...');

  // Collect unique categories from products
  const seen = new Map();
  for (const p of productsJson) {
    const raw = p.categoryName || '';
    const name = raw
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
    const rawSlug = p.categorySlug || '';
    let slug;
    try { slug = decodeURIComponent(rawSlug); } catch { slug = rawSlug; }
    slug = slug.replace(/\s+/g, '-');
    if (name && !seen.has(name)) seen.set(name, slug);
  }

  const catIdMap = {}; // name → Sanity _id
  let order = 0;
  for (const [name, slug] of seen) {
    const doc = {
      _type: 'category',
      _id: `category-${slug}`,
      title: name,
      slug: { _type: 'slug', current: slug },
      sortOrder: order++,
    };
    await client.createOrReplace(doc);
    catIdMap[name] = doc._id;
    console.log(`  ✓ Category: ${name}`);
  }
  return catIdMap;
}

// ── 2. Migrate products ────────────────────────────────────────────────────────
async function migrateProducts(catIdMap) {
  console.log('\n🎧 Migrating products...');

  for (const p of productsJson) {
    console.log(`\n  → ${p.title}`);

    // Upload image
    const imgAsset = p.image ? await uploadImage(p.image, `${p.slug}.jpg`) : null;

    // Resolve category
    const catName = (p.categoryName || '')
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
    const catRef = catIdMap[catName]
      ? { _type: 'reference', _ref: catIdMap[catName] }
      : undefined;

    const doc = {
      _type: 'product',
      _id: `product-${p.slug}`,
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      brand: 'Signia',
      shortDescription: p.description ? p.description.slice(0, 300) : '',
      priceFrom: p.price ? Math.round(parseFloat(p.price)) : 0,
      priceNote: 'Точна вартість визначається після діагностики слуху',
      ...(catRef ? { category: catRef } : {}),
      images: imgAsset ? [{ ...imgAsset, _key: 'main', alt: p.title }] : [],
      isAccessory: Boolean(p.isAccessory),
      isActive: true,
      seo: {
        metaTitle: p.seoTitle || p.title,
        metaDescription: p.seoDescription || '',
      },
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ Product: ${p.title}`);
  }
}

// ── 3. Migrate posts ───────────────────────────────────────────────────────────
async function migratePosts() {
  console.log('\n📝 Migrating posts...');

  for (const post of postsJson) {
    // Decode URL-encoded slug
    let slug = post.slug;
    try { slug = decodeURIComponent(slug); } catch {}
    slug = slug.replace(/^\/+|\/+$/g, '');

    const imgAsset = post.image && post.image.startsWith('http')
      ? await uploadImage(post.image, `post-${slugify(post.title)}.jpg`)
      : null;

    const doc = {
      _type: 'post',
      _id: `post-${slugify(post.title)}`,
      title: post.title,
      slug: { _type: 'slug', current: slug },
      excerpt: post.excerpt || '',
      ...(imgAsset ? { coverImage: { ...imgAsset, alt: post.title } } : {}),
      publishedAt: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
      cityTarget: 'both',
      seo: {
        metaTitle: post.seoTitle || post.title,
        metaDescription: post.seoDescription || post.excerpt || '',
      },
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ Post: ${post.title}`);
  }
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🚀 Starting Sanity migration`);
  console.log(`   Project: ${projectId} / Dataset: ${dataset}\n`);

  const catIdMap = await migrateCategories();
  await migrateProducts(catIdMap);
  await migratePosts();

  console.log('\n✅ Migration complete!\n');
  console.log('Next steps:');
  console.log('  1. Open https://www.sanity.io/manage → your project → Studio');
  console.log('  2. Or run: npx sanity dev (in a separate terminal)');
  console.log('  3. Or visit: http://localhost:3000/studio (when Next.js dev server runs)\n');
}

main().catch((err) => {
  console.error('\n💥 Migration failed:', err);
  process.exit(1);
});
