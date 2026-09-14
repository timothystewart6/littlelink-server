/**
 * Unit tests for app/robots.txt/route.ts
 *
 * Covers: GET handler, dynamic rendering
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { GET } from '../../app/robots.txt/route';

test('robots returns txt when indexable', async () => {
  const originalOgUrl = process.env.OG_URL;
  const originalMetaIndex = process.env.META_INDEX_STATUS;
  process.env.OG_URL = 'https://example.com';
  process.env.META_INDEX_STATUS = 'INDEXABLE';
  try {
    const response = await GET();
    assert.strictEqual(response.status, 200);
    const text = await response.text();
    assert.ok(text.startsWith('User-agent: *'));
    assert.ok(text.includes('Sitemap:'));
    assert.ok(text.includes('Allow: /'));
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

test('robots returns txt with Disallow when not indexable', async () => {
  const originalMetaIndex = process.env.META_INDEX_STATUS;
  process.env.META_INDEX_STATUS = 'NOINDEX';
  try {
    const response = await GET();
    assert.strictEqual(response.status, 200);
    const text = await response.text();
    assert.ok(text.startsWith('User-agent: *'));
    assert.ok(text.includes('Disallow: /'));
    assert.ok(!text.includes('Allow: /'));
  } finally {
    if (originalMetaIndex === undefined) {
      delete process.env.META_INDEX_STATUS;
    } else {
      process.env.META_INDEX_STATUS = originalMetaIndex;
    }
  }
});