import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { nav } from './Header';

const APP_DIR = path.join(process.cwd(), 'src', 'app');

function routeHasPage(href: string): boolean {
  const routeDir = href === '/' ? APP_DIR : path.join(APP_DIR, href.replace(/^\//, ''));
  return fs.existsSync(path.join(routeDir, 'page.tsx'));
}

describe('Header nav (data-level, no rendering framework needed)', () => {
  test('/vse-pro-slukh is present in the nav', () => {
    assert.ok(nav.some((item) => item.href === '/vse-pro-slukh'));
  });

  test('every nav href resolves to a real page.tsx route', () => {
    for (const item of nav) {
      assert.ok(
        routeHasPage(item.href),
        `nav item "${item.label}" (${item.href}) has no matching src/app${item.href}/page.tsx`
      );
    }
  });

  test('no two nav items share the same href (desktop and mobile render the same single array, so this is the only place duplication could hide)', () => {
    const hrefs = nav.map((item) => item.href);
    assert.equal(new Set(hrefs).size, hrefs.length);
  });

  test('/derzhavna-programa-slukhoprotezuvannia is intentionally not in the header nav, but its route exists', () => {
    assert.ok(!nav.some((item) => item.href === '/derzhavna-programa-slukhoprotezuvannia'));
    assert.ok(routeHasPage('/derzhavna-programa-slukhoprotezuvannia'));
  });
});
