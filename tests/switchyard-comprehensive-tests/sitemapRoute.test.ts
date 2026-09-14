/**
 * Unit tests for app/sitemap.xml/route.ts
 *
 * Covers: GET handler, dynamic rendering, 404 when no location
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { GET } from '../../app/sitemap.xml/route';

test('sitemap returns xml when location exists', async () => {
  // Set up the runtime config with required env vars
  const originalOgUrl = process.env.OG_URL;
  const originalMetaIndex = process.env.META_INDEX_STATUS;
  process.env.OG_URL = 'https://example.com';
  process.env.META_INDEX_STATUS = 'INDEXABLE';
  try {
    const response = await GET();
    assert.strictEqual(response.status, 200);
    const text = await response.text();
    assert.ok(text.includes('<?xml'));
    assert.ok(text.includes('<urlset'));
    assert.ok(text.includes('https://example.com/'));
  } finally {
    if (originalOgUrl === undefined) {
      delete process.env.OG_URL;
    } else {
      process.env.OG_URL = originalOgUrl;
    }
    if (originalMetaIndex === undefined) {
      delete process.env.META_INDEX_STATUS;
    } else {
      process.env.META_INDEX_STATUS = originalMetaIndex;
    }
  }
});

test('sitemap returns 404 when no location', async () => {
  const originalEnv = process.env.OG_URL;
  process.env.OG_URL = undefined;
  try {
    const response = await GET();
    assert.strictEqual(response.status, 404);
  } finally {
    if (originalEnv === undefined) {
      delete process.env.OG_URL;
    } else {
      process.env.OG_URL = originalEnv;
    }
  }
});