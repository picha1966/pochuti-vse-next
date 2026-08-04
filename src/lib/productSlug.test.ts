import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import sitemap from '@/app/sitemap';
import { generateMetadata } from '@/app/catalog/[slug]/page';
import { getAllProducts, getProductBySlug, getProductsByCategory, toProduct } from './products';
import { getCanonicalProductPath, normalizeProductSlug } from './productSlug';
import type { SanityProduct } from './sanity/queries';

const UKRAINIAN_SLUG = 'таблетки-сушки';
const LEGACY_SLUG = encodeURIComponent(UKRAINIAN_SLUG);
const DOUBLE_ENCODED_SLUG = encodeURIComponent(LEGACY_SLUG);
const LATIN_SLUG = 'audio-service-volta-hp-t';
const PRODUCT_DATA_PATH = path.join(process.cwd(), 'src', 'data', 'products.json');

describe('product slug normalization', () => {
  test('keeps canonical Unicode and Latin slugs stable', () => {
    assert.equal(normalizeProductSlug(UKRAINIAN_SLUG), UKRAINIAN_SLUG);
    assert.equal(normalizeProductSlug(LATIN_SLUG), LATIN_SLUG);
  });

  test('normalizes once- and double-encoded legacy values', () => {
    assert.equal(normalizeProductSlug(LEGACY_SLUG), UKRAINIAN_SLUG);
    assert.equal(normalizeProductSlug(DOUBLE_ENCODED_SLUG), UKRAINIAN_SLUG);
  });

  test('rejects malformed and unsafe route segments without throwing', () => {
    for (const value of ['bad%ZZ', '%2Fcatalog', '%5Cwindows', '..', 'item%2F..%2Fsecret', 'slug?x=1', 'slug#hash']) {
      assert.doesNotThrow(() => normalizeProductSlug(value));
      assert.equal(normalizeProductSlug(value), null);
    }
  });

  test('creates a canonical catalog path without double encoding', () => {
    assert.equal(getCanonicalProductPath(DOUBLE_ENCODED_SLUG), `/catalog/${UKRAINIAN_SLUG}`);
  });
});

describe('product data and lookup', () => {
  test('migrates exactly the eight legacy fallback records to canonical slugs', async () => {
    const raw = JSON.parse(fs.readFileSync(PRODUCT_DATA_PATH, 'utf-8')) as Array<{ slug: string }>;
    assert.equal(raw.filter((product) => /%[0-9a-f]{2}/i.test(product.slug)).length, 0);

    const products = await getAllProducts();
    assert.equal(products.filter((product) => /[^\x00-\x7F]/.test(product.slug)).length, 8);
  });

  test('finds a Ukrainian product by canonical and legacy route values without duplicate identity', async () => {
    const canonical = await getProductBySlug(UKRAINIAN_SLUG);
    const legacy = await getProductBySlug(LEGACY_SLUG);
    assert.ok(canonical);
    assert.equal(legacy?.id, canonical.id);
    assert.equal(legacy?.slug, UKRAINIAN_SLUG);
  });

  test('keeps Latin product lookup unchanged and rejects invalid slugs', async () => {
    assert.equal((await getProductBySlug(LATIN_SLUG))?.slug, LATIN_SLUG);
    assert.equal(await getProductBySlug('%2Fcatalog'), undefined);
  });

  test('keeps catalog category filtering unchanged', async () => {
    const rawCategory = 'аксесуари';
    const canonical = await getProductsByCategory(rawCategory);
    const encoded = await getProductsByCategory(encodeURIComponent(rawCategory));
    assert.ok(canonical.length > 0);
    assert.equal(encoded.length, canonical.length);
  });

  test('normalizes a Sanity product at the same data boundary', () => {
    const product = toProduct({
      _id: 'sanity-product',
      _type: 'product',
      title: 'Тест',
      slug: LEGACY_SLUG,
      priceFrom: 0,
      isAccessory: true,
    } as SanityProduct);
    assert.equal(product?.slug, UKRAINIAN_SLUG);
  });
});

describe('product SEO URLs', () => {
  test('sitemap emits one URL per product with no double-encoded or duplicate product URL', async () => {
    const entries = await sitemap();
    const productUrls = entries.map((entry) => entry.url).filter((url) => url.includes('/catalog/'));
    assert.equal(productUrls.length, 34);
    assert.equal(new Set(productUrls).size, productUrls.length);
    assert.ok(productUrls.every((url) => !url.includes('%25')));
    assert.ok(productUrls.includes(`https://pochutyvse.com.ua/catalog/${encodeURIComponent(UKRAINIAN_SLUG)}`));
    assert.ok(productUrls.includes(`https://pochutyvse.com.ua/catalog/${LATIN_SLUG}`));
  });

  test('metadata canonicalizes a legacy route input to the product slug', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: DOUBLE_ENCODED_SLUG }) });
    assert.deepEqual(metadata.alternates, { canonical: `/catalog/${UKRAINIAN_SLUG}` });
  });
});
