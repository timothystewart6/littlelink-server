import { test } from 'node:test';
import assert from 'node:assert';
import { buildSitemapXml, isSitemapIndexable, normalizeSitemapUrl, getSitemapLocation } from '../../src/sitemap/sitemapXml';

test('buildSitemapXml generates valid XML with a location', () => {
  const xml = buildSitemapXml('https://example.com/page');
  assert.ok(typeof xml === 'string');
  assert.ok(xml.includes('<?xml'));
  assert.ok(xml.includes('<urlset'));
  assert.ok(xml.includes('https://example.com/page'));
});

test('isSitemapIndexable returns true for indexable status', () => {
  assert.strictEqual(isSitemapIndexable('indexable'), true);
  assert.strictEqual(isSitemapIndexable('NOINDEX'), false);
  assert.strictEqual(isSitemapIndexable(''), false);
  assert.strictEqual(isSitemapIndexable(undefined), false);
});

test('isSitemapIndexable returns false for non-indexable status', () => {
  assert.strictEqual(isSitemapIndexable('noindex'), false);
  assert.strictEqual(isSitemapIndexable('NOINDEX'), false);
});

test('normalizeSitemapUrl normalizes valid URLs', () => {
  const result = normalizeSitemapUrl('https://example.com/page');
  assert.ok(typeof result === 'string');
  assert.ok(result.endsWith('/'));
});

test('normalizeSitemapUrl returns undefined for invalid URLs', () => {
  assert.strictEqual(normalizeSitemapUrl(''), undefined);
  assert.strictEqual(normalizeSitemapUrl('not-a-url'), undefined);
  assert.strictEqual(normalizeSitemapUrl(undefined), undefined);
});

test('getSitemapLocation returns location when indexable', () => {
  const result = getSitemapLocation({ META_INDEX_STATUS: 'indexable', OG_URL: 'https://example.com' });
  assert.ok(typeof result === 'string');
});

test('getSitemapLocation returns undefined when not indexable', () => {
  const result = getSitemapLocation({ META_INDEX_STATUS: 'noindex', OG_URL: 'https://example.com' });
  assert.strictEqual(result, undefined);
});
