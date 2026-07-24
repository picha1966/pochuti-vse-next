/**
 * getAllPosts()/getPostBySlug() are Sanity-first with a JSON fallback
 * (see src/lib/posts.ts). These tests run in a plain `tsx --test` process,
 * which never loads .env.local, so NEXT_PUBLIC_SANITY_PROJECT_ID/DATASET
 * are genuinely unset here -- isSanityConfigured is false and every call
 * below exercises the real JSON fallback (src/data/posts.json) with zero
 * network access. This is intentional, not a workaround: it lets the
 * fallback path be tested against the real fallback data without mocks.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getAllPosts, getPostBySlug } from './posts';
import { isSanityConfigured } from './sanity/client';

const POSTS_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'posts.json');

describe('posts.ts JSON fallback (Sanity unconfigured in this test process)', () => {
  test('Sanity is not configured in this process (precondition for the rest of this suite)', () => {
    assert.equal(isSanityConfigured, false);
  });

  test('getAllPosts() returns every post from the real posts.json fallback file', async () => {
    const raw = JSON.parse(fs.readFileSync(POSTS_JSON_PATH, 'utf-8'));
    const posts = await getAllPosts();
    assert.equal(posts.length, raw.length);
    assert.ok(posts.length > 0, 'expected posts.json to contain at least one post');
  });

  test('every returned post has the required BlogPost shape', async () => {
    const posts = await getAllPosts();
    for (const post of posts) {
      assert.equal(typeof post.slug, 'string');
      assert.ok(post.slug.length > 0);
      assert.equal(typeof post.title, 'string');
      assert.ok(post.title.length > 0);
      assert.equal(typeof post._id, 'string');
    }
  });

  test('getPostBySlug() finds an existing slug via the fallback', async () => {
    const all = await getAllPosts();
    const target = all[0];
    const found = await getPostBySlug(target.slug);
    assert.ok(found);
    assert.equal(found?.slug, target.slug);
    assert.equal(found?.title, target.title);
  });

  test('getPostBySlug() returns undefined for a slug that does not exist', async () => {
    const found = await getPostBySlug('this-slug-does-not-exist-anywhere-xyz');
    assert.equal(found, undefined);
  });

  test('getPostBySlug() also matches a percent-encoded slug against its decoded form', async () => {
    const all = await getAllPosts();
    const target = all.find((p) => /[^\x00-\x7F]/.test(p.slug)) ?? all[0];
    const encoded = encodeURIComponent(target.slug);
    const found = await getPostBySlug(encoded);
    assert.ok(found, `expected a match for encoded slug of ${target.slug}`);
    assert.equal(found?.slug, target.slug);
  });
});
