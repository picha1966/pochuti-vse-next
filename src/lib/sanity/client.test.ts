/**
 * These tests spawn a fresh `tsx` process per scenario, on purpose:
 * isSanityConfigured/client/serverClient are computed once at module load
 * time from process.env, so the only reliable way to exercise different
 * env configurations without module-cache bleed between cases is a fresh
 * process per case. No network call ever happens here — next-sanity's
 * createClient() only builds a config object synchronously.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const PROBE = path.join(__dirname, 'client.probe.mjs');

function runWithEnv(env: Record<string, string | undefined>): {
  isSanityConfigured: boolean;
  clientIsNull: boolean;
  serverClientIsNull: boolean;
} {
  const childEnv: NodeJS.ProcessEnv = { ...process.env };
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete childEnv[key];
    else childEnv[key] = value;
  }
  // Never let a real, already-configured Sanity project leak into a "unconfigured" case.
  delete childEnv.NEXT_PUBLIC_SANITY_PROJECT_ID;
  delete childEnv.NEXT_PUBLIC_SANITY_DATASET;
  delete childEnv.SANITY_READ_TOKEN;
  for (const [key, value] of Object.entries(env)) {
    if (value !== undefined) childEnv[key] = value;
  }

  const out = execFileSync(
    process.execPath,
    ['--import', 'tsx', PROBE],
    { env: childEnv, encoding: 'utf-8' }
  );
  return JSON.parse(out);
}

describe('sanity/client config matrix (no network, subprocess-isolated)', () => {
  test('no projectId, no dataset -> not configured, client and serverClient are null', () => {
    const result = runWithEnv({});
    assert.equal(result.isSanityConfigured, false);
    assert.equal(result.clientIsNull, true);
    assert.equal(result.serverClientIsNull, true);
  });

  test('projectId set but dataset missing -> still not configured, no invalid client is built', () => {
    const result = runWithEnv({ NEXT_PUBLIC_SANITY_PROJECT_ID: 'fake-project' });
    assert.equal(result.isSanityConfigured, false);
    assert.equal(result.clientIsNull, true);
    assert.equal(result.serverClientIsNull, true);
  });

  test('dataset set but projectId missing -> still not configured, no invalid client is built', () => {
    const result = runWithEnv({ NEXT_PUBLIC_SANITY_DATASET: 'fake-dataset' });
    assert.equal(result.isSanityConfigured, false);
    assert.equal(result.clientIsNull, true);
    assert.equal(result.serverClientIsNull, true);
  });

  test('both projectId and dataset set -> configured, both clients are real objects', () => {
    const result = runWithEnv({
      NEXT_PUBLIC_SANITY_PROJECT_ID: 'fake-project',
      NEXT_PUBLIC_SANITY_DATASET: 'fake-dataset',
    });
    assert.equal(result.isSanityConfigured, true);
    assert.equal(result.clientIsNull, false);
    assert.equal(result.serverClientIsNull, false);
  });
});
