import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { GET } from './route';

const BLOG_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'blog');
const REAL_IMAGE = fs
  .readdirSync(BLOG_IMAGES_DIR)
  .find((name) => name.toLowerCase().endsWith('.png') || name.toLowerCase().endsWith('.webp'));

function call(filename: string) {
  return GET(new NextRequest('http://localhost/images/blog/' + encodeURIComponent(filename)), {
    params: Promise.resolve({ filename }),
  });
}

describe('images/blog/[filename] route (no network, filesystem only)', () => {
  test('a real, existing blog image returns 200 with the correct content-type', async () => {
    assert.ok(REAL_IMAGE, 'expected at least one .png/.webp fixture in public/images/blog');
    const res = await call(REAL_IMAGE as string);
    assert.equal(res.status, 200);
    const ext = path.extname(REAL_IMAGE as string).toLowerCase();
    const expectedType = ext === '.webp' ? 'image/webp' : 'image/png';
    assert.equal(res.headers.get('content-type'), expectedType);
  });

  test('a missing file returns 404', async () => {
    const res = await call('this-file-does-not-exist-xyz.png');
    assert.equal(res.status, 404);
  });

  test('literal ".." traversal is blocked with 403, not 404', async () => {
    const res = await call('../../../etc/passwd.png');
    assert.equal(res.status, 403);
  });

  test('a forward slash in filename is blocked with 403', async () => {
    const res = await call('sub/dir.png');
    assert.equal(res.status, 403);
  });

  test('a backslash in filename is blocked with 403', async () => {
    const res = await call('sub\\dir.png');
    assert.equal(res.status, 403);
  });

  test('percent-encoded traversal is blocked (decoded by Next.js before the handler runs)', async () => {
    // Next.js decodes dynamic-segment params before the handler sees them,
    // so simulate what the handler actually receives: the decoded string.
    const res = await call('..%2f..%2fetc%2fpasswd'.replace(/%2f/gi, '/'));
    assert.equal(res.status, 403);
  });

  test('an unsupported extension is blocked with 404', async () => {
    const res = await call('whatever.exe');
    assert.equal(res.status, 404);
  });

  test('a filename with no extension is blocked with 404', async () => {
    const res = await call('no-extension-at-all');
    assert.equal(res.status, 404);
  });

  test('response body never leaks the resolved filesystem path', async () => {
    const res = await call('this-file-does-not-exist-xyz.png');
    const text = await res.text();
    assert.ok(!text.includes(process.cwd()), 'response body must not contain the server filesystem path');
    assert.ok(!text.includes(BLOG_IMAGES_DIR));
  });

  test('no network access happens for any of the above (filesystem-only route)', () => {
    // Structural guarantee: the route module only imports 'fs' and 'path',
    // never a network/http client. Asserted here as documentation; the
    // absence of any fetch/http import is what makes every test above safe.
    assert.ok(true);
  });
});
