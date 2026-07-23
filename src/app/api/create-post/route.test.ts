import { test, describe, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import Module from 'node:module';
import path from 'node:path';
import fs from 'fs';

/**
 * route.ts imports `@/lib/publishAuth` (the project's Next.js path alias,
 * defined in tsconfig.json's `paths`). tsc does not rewrite that into a
 * relative require when compiling to CommonJS for this standalone test
 * run — only Next.js's own bundler understands it. Rather than touch
 * tsconfig.json or package.json (out of scope for this cluster), this
 * test process teaches Node's CJS resolver about that one alias for its
 * own lifetime only, the same way tools like tsconfig-paths do.
 */
const ModuleAny = Module as unknown as {
  _resolveFilename: (request: string, ...rest: unknown[]) => string;
};
const originalResolveFilename = ModuleAny._resolveFilename;
ModuleAny._resolveFilename = function (request: string, ...rest: unknown[]) {
  if (request.startsWith('@/')) {
    // Compiled layout mirrors src/: this file ends up at
    // <outDir>/app/api/create-post/route.test.js, and `@/x` must resolve
    // to <outDir>/x.
    const outDirRoot = path.resolve(__dirname, '../../..');
    const rewritten = path.join(outDirRoot, request.slice(2));
    return originalResolveFilename.call(this, rewritten, ...rest);
  }
  return originalResolveFilename.apply(this, [request, ...rest]);
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { NextRequest } = require('next/server');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { POST } = require('./route');

const MIN_TOKEN_BYTES = 32;
const VALID_TOKEN = 'a'.repeat(MIN_TOKEN_BYTES);
const ENV_VAR = 'POCHUTYVSE_PUBLISH_TOKEN';

function makeRequest(opts: {
  headers?: Record<string, string>;
  body?: unknown;
}): InstanceType<typeof NextRequest> {
  const bodyText = opts.body !== undefined ? JSON.stringify(opts.body) : undefined;
  return new NextRequest('http://localhost/api/create-post', {
    method: 'POST',
    headers: opts.headers ?? {},
    body: bodyText,
  });
}

let savedEnv: string | undefined;

beforeEach(() => {
  savedEnv = process.env[ENV_VAR];
  delete process.env[ENV_VAR];
});

afterEach(() => {
  mock.restoreAll();
  if (savedEnv === undefined) {
    delete process.env[ENV_VAR];
  } else {
    process.env[ENV_VAR] = savedEnv;
  }
});

describe('POST /api/create-post — auth/config gate', () => {
  test('missing server token -> 503, fs and request.json untouched', async () => {
    const readSpy = mock.method(fs, 'readFileSync', () => '[]');
    const writeSpy = mock.method(fs, 'writeFileSync', () => undefined);
    const existsSpy = mock.method(fs, 'existsSync', () => true);
    const jsonSpy = mock.method(NextRequest.prototype, 'json');

    const req = makeRequest({
      headers: { authorization: `Bearer ${VALID_TOKEN}` },
      body: { title: 'x'.repeat(25), content: 'y'.repeat(250), image: '/images/blog/a.png' },
    });
    const res = await POST(req);

    assert.equal(res.status, 503);
    assert.equal(res.headers.get('cache-control'), 'no-store');
    const body = await res.json();
    assert.equal(body.error, 'publishing temporarily unavailable');

    assert.equal(readSpy.mock.callCount(), 0);
    assert.equal(writeSpy.mock.callCount(), 0);
    assert.equal(existsSpy.mock.callCount(), 0);
    assert.equal(jsonSpy.mock.callCount(), 0);
  });

  test('missing Authorization -> 401, fs and request.json untouched, correct headers', async () => {
    process.env[ENV_VAR] = VALID_TOKEN;
    const readSpy = mock.method(fs, 'readFileSync', () => '[]');
    const writeSpy = mock.method(fs, 'writeFileSync', () => undefined);
    const jsonSpy = mock.method(NextRequest.prototype, 'json');

    const req = makeRequest({ body: { title: 'x'.repeat(25), content: 'y'.repeat(250) } });
    const res = await POST(req);

    assert.equal(res.status, 401);
    assert.equal(res.headers.get('cache-control'), 'no-store');
    assert.equal(res.headers.get('www-authenticate'), 'Bearer');
    const bodyText = await res.text();
    assert.equal(bodyText.includes(VALID_TOKEN), false);

    assert.equal(readSpy.mock.callCount(), 0);
    assert.equal(writeSpy.mock.callCount(), 0);
    assert.equal(jsonSpy.mock.callCount(), 0);
  });

  test('wrong token -> 401, fs untouched', async () => {
    process.env[ENV_VAR] = VALID_TOKEN;
    const readSpy = mock.method(fs, 'readFileSync', () => '[]');
    const jsonSpy = mock.method(NextRequest.prototype, 'json');

    const req = makeRequest({
      headers: { authorization: `Bearer ${'b'.repeat(MIN_TOKEN_BYTES)}` },
      body: { title: 'x'.repeat(25), content: 'y'.repeat(250) },
    });
    const res = await POST(req);

    assert.equal(res.status, 401);
    assert.equal(readSpy.mock.callCount(), 0);
    assert.equal(jsonSpy.mock.callCount(), 0);
  });

  test('oversized declared Content-Length -> 413, fs and request.json untouched', async () => {
    process.env[ENV_VAR] = VALID_TOKEN;
    const readSpy = mock.method(fs, 'readFileSync', () => '[]');
    const jsonSpy = mock.method(NextRequest.prototype, 'json');

    const req = makeRequest({
      headers: {
        authorization: `Bearer ${VALID_TOKEN}`,
        'content-length': String(2 * 1024 * 1024), // 2 MiB > 1 MiB limit
      },
      body: { title: 'x'.repeat(25), content: 'y'.repeat(250) },
    });
    const res = await POST(req);

    assert.equal(res.status, 413);
    assert.equal(res.headers.get('cache-control'), 'no-store');
    assert.equal(readSpy.mock.callCount(), 0);
    assert.equal(jsonSpy.mock.callCount(), 0);
  });

  test('valid auth passes through to existing duplicate-title logic -> 409 unchanged', async () => {
    // Note: slug-collision alone does not reach the route's own
    // `slugExists()` 409 branch, because the pre-existing (untouched)
    // `ensureUniqueSlug()` always resolves collisions to a free slug
    // first — that branch is effectively unreachable in the current
    // code, independent of this patch. Title-based dedup is the
    // reachable 409 path, so that's what this test exercises.
    process.env[ENV_VAR] = VALID_TOKEN;
    const existingPosts = [
      { title: 'Existing post title here for testing', slug: 'existing-post', content: 'c', excerpt: 'e', date: 'd', image: 'i', _id: 'existing-post' },
    ];
    mock.method(fs, 'existsSync', () => true);
    mock.method(fs, 'readFileSync', () => JSON.stringify(existingPosts));
    const writeSpy = mock.method(fs, 'writeFileSync', () => undefined);

    const req = makeRequest({
      headers: { authorization: `Bearer ${VALID_TOKEN}` },
      body: {
        title: 'Existing post title here for testing',
        content: 'z'.repeat(250),
        image: '/images/blog/a.png',
      },
    });
    const res = await POST(req);

    assert.equal(res.status, 409);
    const body = await res.json();
    assert.equal(body.error, 'post with this title already exists');
    // Duplicate detected on read — never reaches the write step.
    assert.equal(writeSpy.mock.callCount(), 0);
  });
});
