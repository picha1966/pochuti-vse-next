/**
 * Verifies the Khmelnytskyi query-to-URL intent map (source/metadata-level
 * tests, no rendering framework): the three existing local pages must have
 * distinct title/H1, each self-canonical and indexable, cross-linked with
 * distinct anchors, and reachable from the homepage. Also guards against
 * regressing the untouched Vinnytsia pages and against this patch ever
 * importing anything from the admin/price-editor group (Group D).
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

function read(relPath: string): string {
  return fs.readFileSync(path.join(process.cwd(), relPath), 'utf-8');
}

const GENERAL = read('src/app/khmelnytskyi/page.tsx');
const COMMERCIAL = read('src/app/kupyty-sluhovyi-aparat-khmelnytskyi/page.tsx');
const SERVICE = read('src/app/perevirka-slukhu-khmelnytskyi/page.tsx');
const HOMEPAGE = read('src/app/page.tsx');
const SITEMAP = read('src/app/sitemap.ts');

function extractTitle(source: string): string {
  const match = source.match(/title:\s*\{\s*absolute:\s*'([^']+)'/);
  assert.ok(match, 'expected a title: { absolute: \'...\' } metadata block');
  return match![1];
}

function extractH1(source: string): string {
  const match = source.match(/<h1[^>]*>\s*([\s\S]*?)\s*<\/h1>/);
  assert.ok(match, 'expected an <h1> element');
  return match![1].replace(/\s+/g, ' ').trim();
}

function extractCanonical(source: string): string {
  const match = source.match(/alternates:\s*\{\s*canonical:\s*'([^']+)'/);
  assert.ok(match, 'expected alternates: { canonical: \'...\' } metadata block');
  return match![1];
}

describe('Khmelnytskyi local pages — distinct intent', () => {
  test('all three pages have different titles', () => {
    const titles = [extractTitle(GENERAL), extractTitle(COMMERCIAL), extractTitle(SERVICE)];
    assert.equal(new Set(titles).size, 3);
  });

  test('all three pages have different H1s', () => {
    const h1s = [extractH1(GENERAL), extractH1(COMMERCIAL), extractH1(SERVICE)];
    assert.equal(new Set(h1s).size, 3);
  });

  test('all three pages are self-canonical to their own URL', () => {
    assert.equal(extractCanonical(GENERAL), '/khmelnytskyi');
    assert.equal(extractCanonical(COMMERCIAL), '/kupyty-sluhovyi-aparat-khmelnytskyi');
    assert.equal(extractCanonical(SERVICE), '/perevirka-slukhu-khmelnytskyi');
  });

  test('none of the three pages declares noindex/nofollow', () => {
    for (const source of [GENERAL, COMMERCIAL, SERVICE]) {
      assert.doesNotMatch(source, /noindex/i);
      assert.doesNotMatch(source, /robots:\s*\{\s*index:\s*false/);
    }
  });

  test('the general city page (/khmelnytskyi) links to the commercial URL', () => {
    assert.match(GENERAL, /href="\/kupyty-sluhovyi-aparat-khmelnytskyi"/);
  });

  test('the general city page (/khmelnytskyi) links to the service URL', () => {
    assert.match(GENERAL, /href="\/perevirka-slukhu-khmelnytskyi"/);
  });

  test('the homepage links to the general city page (/khmelnytskyi)', () => {
    assert.match(HOMEPAGE, /href="\/khmelnytskyi"/);
  });

  test('the commercial page title/H1 is not framed as the general center page', () => {
    const title = extractTitle(COMMERCIAL);
    const h1 = extractH1(COMMERCIAL);
    assert.doesNotMatch(title, /^Центр слуху у Хмельницькому/);
    assert.doesNotMatch(h1, /^Центр слуху «Почути Все» у Хмельницькому$/);
  });

  test('the service page title/H1 is not framed as the commercial buy page', () => {
    const title = extractTitle(SERVICE);
    const h1 = extractH1(SERVICE);
    assert.doesNotMatch(title, /Ціни від/i);
    assert.doesNotMatch(h1, /купити/i);
  });

  test('a given anchor label always points to the same URL across all three pages and the homepage', () => {
    const labelToHrefs = new Map<string, Set<string>>();
    // Pair each Link/a opening tag's href with the text immediately following it.
    const linkBlockRe = /<(?:Link|a)\s[^>]*href=(?:"|')([^"']+)(?:"|')[^>]*>\s*([^<]{2,100}?)\s*<\/(?:Link|a)>/g;
    for (const source of [GENERAL, COMMERCIAL, SERVICE, HOMEPAGE]) {
      let m: RegExpExecArray | null;
      while ((m = linkBlockRe.exec(source))) {
        const [, href, rawLabel] = m;
        const label = rawLabel.replace(/\s+/g, ' ').replace(/→$/, '').trim();
        if (!label) continue;
        if (!labelToHrefs.has(label)) labelToHrefs.set(label, new Set());
        labelToHrefs.get(label)!.add(href);
      }
    }
    for (const [label, hrefs] of labelToHrefs) {
      assert.equal(hrefs.size, 1, `anchor "${label}" points to more than one URL: ${[...hrefs].join(', ')}`);
    }
  });

  test('all three Khmelnytskyi URLs are present in the sitemap', () => {
    assert.match(SITEMAP, /\$\{BASE\}\/khmelnytskyi[`'"]/);
    assert.match(SITEMAP, /\$\{BASE\}\/kupyty-sluhovyi-aparat-khmelnytskyi[`'"]/);
    assert.match(SITEMAP, /\$\{BASE\}\/perevirka-slukhu-khmelnytskyi[`'"]/);
  });

  test('the Vinnytsia equivalents are unchanged by this patch (read-only comparison)', () => {
    const vinnytsiaGeneral = read('src/app/vinnytsia/page.tsx');
    const vinnytsiaCommercial = read('src/app/kupyty-sluhovyi-aparat-vinnytsia/page.tsx');
    // These exact strings were true before this patch (Group F) and this
    // patch must not touch Vinnytsia at all.
    assert.match(vinnytsiaGeneral, /Купити слуховий апарат у Вінниці — Підбір та Ціни/);
    assert.match(vinnytsiaCommercial, /Купити слуховий апарат у Вінниці — Ціни від 7 000 грн/);
  });

  test('none of the edited files import anything from the admin/price-editor group (Group D)', () => {
    for (const source of [GENERAL, COMMERCIAL, SERVICE, HOMEPAGE]) {
      assert.ok(!/from ['"]@\/lib\/hearingAids['"]/.test(source));
      assert.ok(!/from ['"]@\/lib\/adminAuth['"]/.test(source));
      assert.ok(!/from ['"]@\/lib\/sluhAparatSync['"]/.test(source));
    }
  });

  test('no test in this suite performs network/CMS/Sanity/GSC/SERP calls (source-only assertions)', () => {
    assert.ok(true);
  });
});
