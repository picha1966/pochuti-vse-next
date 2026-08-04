const MAX_DECODE_PASSES = 2;

/**
 * Converts a legacy URL-encoded product slug into the canonical route value.
 * Product slugs are one URL path segment, never encoded URLs or paths.
 */
export function normalizeProductSlug(value: unknown): string | null {
  if (typeof value !== 'string' || value.length === 0) return null;

  let slug = value;
  for (let pass = 0; pass < MAX_DECODE_PASSES && slug.includes('%'); pass += 1) {
    try {
      slug = decodeURIComponent(slug);
    } catch {
      return null;
    }
  }

  if (slug.includes('%')) return null;

  slug = slug.normalize('NFC');
  if (
    slug.length === 0 ||
    slug.includes('/') ||
    slug.includes('\\') ||
    slug.includes('\0') ||
    slug.includes('..') ||
    slug.includes('?') ||
    slug.includes('#')
  ) {
    return null;
  }

  return slug;
}

export function getCanonicalProductPath(slug: unknown): string | null {
  const canonicalSlug = normalizeProductSlug(slug);
  return canonicalSlug ? `/catalog/${canonicalSlug}` : null;
}
