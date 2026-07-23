import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';

import {
  getConfiguredToken,
  parseBearerToken,
  verifyToken,
  checkPublishAuth,
  PUBLISH_TOKEN_ENV_VAR,
  MIN_TOKEN_BYTES,
} from './publishAuth';

// Synthetic test values only — never the real secret.
const VALID_TOKEN = 'a'.repeat(MIN_TOKEN_BYTES); // exactly 32 bytes
const VALID_TOKEN_2 = 'b'.repeat(MIN_TOKEN_BYTES); // same length, different value
const SHORT_TOKEN = 'a'.repeat(MIN_TOKEN_BYTES - 1); // 31 bytes — one under the minimum

let savedEnv: string | undefined;

beforeEach(() => {
  savedEnv = process.env[PUBLISH_TOKEN_ENV_VAR];
  delete process.env[PUBLISH_TOKEN_ENV_VAR];
});

afterEach(() => {
  if (savedEnv === undefined) {
    delete process.env[PUBLISH_TOKEN_ENV_VAR];
  } else {
    process.env[PUBLISH_TOKEN_ENV_VAR] = savedEnv;
  }
});

describe('getConfiguredToken', () => {
  test('missing env -> null (unavailable)', () => {
    assert.equal(getConfiguredToken(), null);
  });

  test('empty env -> null (unavailable)', () => {
    process.env[PUBLISH_TOKEN_ENV_VAR] = '';
    assert.equal(getConfiguredToken(), null);
  });

  test('token shorter than MIN_TOKEN_BYTES -> null (unavailable)', () => {
    process.env[PUBLISH_TOKEN_ENV_VAR] = SHORT_TOKEN;
    assert.equal(getConfiguredToken(), null);
  });

  test('token exactly MIN_TOKEN_BYTES -> returned', () => {
    process.env[PUBLISH_TOKEN_ENV_VAR] = VALID_TOKEN;
    assert.equal(getConfiguredToken(), VALID_TOKEN);
  });
});

describe('parseBearerToken', () => {
  test('missing Authorization header -> null', () => {
    assert.equal(parseBearerToken(null), null);
    assert.equal(parseBearerToken(undefined), null);
  });

  test('wrong scheme -> null', () => {
    assert.equal(parseBearerToken(`Basic ${VALID_TOKEN}`), null);
  });

  test('lowercase "bearer" -> null (scheme is case-sensitive)', () => {
    assert.equal(parseBearerToken(`bearer ${VALID_TOKEN}`), null);
  });

  test('double space between scheme and token -> null', () => {
    assert.equal(parseBearerToken(`Bearer  ${VALID_TOKEN}`), null);
  });

  test('empty Bearer token -> null', () => {
    assert.equal(parseBearerToken('Bearer '), null);
    assert.equal(parseBearerToken('Bearer'), null);
  });

  test('whitespace inside token -> null', () => {
    assert.equal(parseBearerToken('Bearer tok\ten'), null);
    assert.equal(parseBearerToken('Bearer tok\nen'), null);
  });

  test('trailing extra text after token -> null', () => {
    assert.equal(parseBearerToken(`Bearer ${VALID_TOKEN} extra`), null);
  });

  test('well-formed header -> exact token returned', () => {
    assert.equal(parseBearerToken(`Bearer ${VALID_TOKEN}`), VALID_TOKEN);
  });
});

describe('verifyToken', () => {
  test('matching tokens -> true', () => {
    assert.equal(verifyToken(VALID_TOKEN, VALID_TOKEN), true);
  });

  test('wrong token, same byte length -> false', () => {
    assert.equal(verifyToken(VALID_TOKEN_2, VALID_TOKEN), false);
  });

  test('wrong token, different byte length -> false, no exception', () => {
    assert.doesNotThrow(() => {
      const result = verifyToken('short', VALID_TOKEN);
      assert.equal(result, false);
    });
  });

  test('multi-byte UTF-8 length is compared in bytes, not characters', () => {
    // 16 "é" characters = 16 chars but 32 UTF-8 bytes (2 bytes each) —
    // must not be treated as equal-length to a 32-char ASCII token.
    const multiByte = 'é'.repeat(16);
    assert.doesNotThrow(() => {
      assert.equal(verifyToken(multiByte, VALID_TOKEN), false);
    });
  });
});

describe('checkPublishAuth', () => {
  test('server not configured -> 503, regardless of header', () => {
    const result = checkPublishAuth(`Bearer ${VALID_TOKEN}`);
    assert.deepEqual(result, { ok: false, status: 503 });
  });

  test('server configured, missing Authorization -> 401', () => {
    process.env[PUBLISH_TOKEN_ENV_VAR] = VALID_TOKEN;
    assert.deepEqual(checkPublishAuth(null), { ok: false, status: 401 });
  });

  test('server configured, wrong token -> 401', () => {
    process.env[PUBLISH_TOKEN_ENV_VAR] = VALID_TOKEN;
    assert.deepEqual(checkPublishAuth(`Bearer ${VALID_TOKEN_2}`), { ok: false, status: 401 });
  });

  test('server configured, correct token -> authorized', () => {
    process.env[PUBLISH_TOKEN_ENV_VAR] = VALID_TOKEN;
    assert.deepEqual(checkPublishAuth(`Bearer ${VALID_TOKEN}`), { ok: true });
  });
});
