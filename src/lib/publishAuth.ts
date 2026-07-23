import { timingSafeEqual } from 'crypto';

/**
 * Authorization for the SEO-bot-facing POST /api/create-post publishing
 * path. Deliberately separate from src/lib/adminAuth.ts (different secret,
 * different consumer — admin-prices is a human in a browser, this is a
 * machine client) — not reused on purpose.
 */

export const PUBLISH_TOKEN_ENV_VAR = 'POCHUTYVSE_PUBLISH_TOKEN';
export const MIN_TOKEN_BYTES = 32;

/**
 * Returns the configured server-side token, or null if it's absent or
 * shorter than MIN_TOKEN_BYTES (UTF-8 byte length, not character count).
 * A null return means "treat the endpoint as unconfigured" — callers must
 * fail closed (503), never fall back to an unauthenticated path.
 */
export function getConfiguredToken(): string | null {
  const raw = process.env[PUBLISH_TOKEN_ENV_VAR];
  if (typeof raw !== 'string') return null;
  if (Buffer.byteLength(raw, 'utf8') < MIN_TOKEN_BYTES) return null;
  return raw;
}

/**
 * Strict `Authorization: Bearer <token>` parser.
 *
 * Rejects (returns null) anything that isn't exactly `Bearer` (case
 * sensitive) + one space + a non-empty token with no whitespace and no
 * trailing text. No query/body/cookie fallback exists anywhere — this is
 * the only accepted credential shape.
 */
export function parseBearerToken(header: string | null | undefined): string | null {
  if (typeof header !== 'string') return null;

  const parts = header.split(' ');
  if (parts.length !== 2) return null; // must be exactly "Bearer <token>", no more/fewer spaces

  const [scheme, token] = parts;
  if (scheme !== 'Bearer') return null;
  if (token.length === 0) return null;
  if (/\s/.test(token)) return null; // catches non-space whitespace (tab/newline) inside the token

  return token;
}

/**
 * Constant-time comparison of the candidate token against the configured
 * one. Buffer lengths are compared first (cheap, not secret) — only equal
 * -length buffers reach timingSafeEqual, so it never throws.
 */
export function verifyToken(candidate: string, configured: string): boolean {
  const candidateBuf = Buffer.from(candidate, 'utf8');
  const configuredBuf = Buffer.from(configured, 'utf8');

  if (candidateBuf.length !== configuredBuf.length) return false;
  return timingSafeEqual(candidateBuf, configuredBuf);
}

export type PublishAuthResult =
  | { ok: true }
  | { ok: false; status: 503 }
  | { ok: false; status: 401 };

/**
 * Single entry point the route handler calls. Collapses every failure
 * reason except "server not configured" into a generic 401 — callers must
 * not use the distinction between parse-failure and wrong-token to build a
 * more specific response; that's the point (no oracle for scheme, length,
 * or value).
 */
export function checkPublishAuth(authorizationHeader: string | null | undefined): PublishAuthResult {
  const configured = getConfiguredToken();
  if (!configured) {
    return { ok: false, status: 503 };
  }

  const candidate = parseBearerToken(authorizationHeader);
  if (!candidate) {
    return { ok: false, status: 401 };
  }

  if (!verifyToken(candidate, configured)) {
    return { ok: false, status: 401 };
  }

  return { ok: true };
}
