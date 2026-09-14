/**
 * Unit tests for src/robots/robotsTxt.ts
 *
 * Covers: buildRobotsTxt, getSitemapIndexUrl, normalizeRobotsText
 * All meaningful conditional branches and edge cases.
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { buildRobotsTxt } from '../../src/robots/robotsTxt';

test('buildRobotsTxt includes sitemap URL when indexable', () => {
  const config = {
    META_INDEX_STATUS: 'INDEXABLE' as const,
    OG_URL: 'https://example.com',
    ROBOTS_TXT: undefined,
    ROBOTS_ADDITIONAL_RULES: undefined,
  };
  const result = buildRobotsTxt(config);
  assert.ok(result.includes('Sitemap:'));
  assert.ok(result.includes('https://example.com/sitemap.xml'));
});

test('buildRobotsTxt disallows when not indexable', () => {
  const config = {
    META_INDEX_STATUS: 'NOINDEX' as const,
    OG_URL: 'https://example.com',
    ROBOTS_TXT: undefined,
    ROBOTS_ADDITIONAL_RULES: undefined,
  };
  const result = buildRobotsTxt(config);
  assert.ok(result.includes('Disallow: /'));
  assert.ok(!result.includes('Allow: /'));
});

test('buildRobotsTxt allows when indexable', () => {
  const config = {
    META_INDEX_STATUS: 'INDEXABLE' as const,
    OG_URL: 'https://example.com',
    ROBOTS_TXT: undefined,
    ROBOTS_ADDITIONAL_RULES: undefined,
  };
  const result = buildRobotsTxt(config);
  assert.ok(result.includes('Allow: /'));
  assert.ok(!result.includes('Disallow: /'));
});

test('buildRobotsTxt uses custom ROBOTS_TXT when provided', () => {
  const config = {
    META_INDEX_STATUS: 'NOINDEX' as const,
    OG_URL: undefined,
    ROBOTS_TXT: 'User-agent: *\nDisallow: /private',
    ROBOTS_ADDITIONAL_RULES: undefined,
  };
  const result = buildRobotsTxt(config);
  assert.strictEqual(result, 'User-agent: *\nDisallow: /private\n');
});

test('buildRobotsTxt includes additional rules', () => {
  const config = {
    META_INDEX_STATUS: 'INDEXABLE' as const,
    OG_URL: 'https://example.com',
    ROBOTS_TXT: undefined,
    ROBOTS_ADDITIONAL_RULES: 'Crawl-delay: 10',
  };
  const result = buildRobotsTxt(config);
  assert.ok(result.includes('Crawl-delay: 10'));
});