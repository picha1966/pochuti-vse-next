import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getAllPosts } from '@/lib/posts';

const PAGE_SOURCE = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'page.tsx'), 'utf-8');

describe('homepage (src/app/page.tsx) data flow — no rendering framework needed', () => {
  test('getAllPosts() (used by the homepage) resolves without throwing and without Sanity being configured', async () => {
    const posts = await getAllPosts();
    assert.ok(Array.isArray(posts));
  });

  test('the recent-posts section only renders when there is at least one post (empty list is safe)', () => {
    assert.match(PAGE_SOURCE, /recentPosts\.length > 0 &&/);
  });

  test('recentPosts is always capped, so an empty array is a valid, unbroken input to the section', () => {
    assert.match(PAGE_SOURCE, /\.slice\(0, 3\)/);
  });

  test('homepage does not import anything from the admin/price-editor group (Group D)', () => {
    assert.ok(!/from ['"]@\/lib\/hearingAids['"]/.test(PAGE_SOURCE));
    assert.ok(!/from ['"]@\/lib\/products['"]/.test(PAGE_SOURCE));
    assert.ok(!/from ['"]@\/lib\/sluhAparatSync['"]/.test(PAGE_SOURCE));
    assert.ok(!/from ['"]@\/lib\/adminAuth['"]/.test(PAGE_SOURCE));
  });

  test('homepage only depends on the already-committed blog loader (Group A) for its new section', () => {
    assert.match(PAGE_SOURCE, /from ['"]@\/lib\/posts['"]/);
  });
});
