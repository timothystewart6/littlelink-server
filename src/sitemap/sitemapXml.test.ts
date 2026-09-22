import { describe, it, expect } from 'vitest';
import { normalizeSitemapUrl, isSitemapIndexable, buildSitemapXml } from './sitemapXml';

describe('normalizeSitemapUrl', () => {
  it('returns undefined for invalid URL', () => {
    const result = normalizeSitemapUrl('not-a-valid-url');
    expect(result).toBeUndefined();
  });

  it('returns undefined for URL with non-http protocol', () => {
    const result = normalizeSitemapUrl('ftp://example.com');
    expect(result).toBeUndefined();
  });

  it('returns normalized URL for valid http URL', () => {
    const result = normalizeSitemapUrl('https://example.com/page');
    expect(result).toBe('https://example.com/page/');
  });

  it('returns undefined for empty string', () => {
    const result = normalizeSitemapUrl('');
    expect(result).toBeUndefined();
  });

  it('returns undefined for URL with only whitespace', () => {
    const result = normalizeSitemapUrl('   ');
    expect(result).toBeUndefined();
  });
});

describe('isSitemapIndexable', () => {
  it('returns false when metaIndexStatus is undefined', () => {
    expect(isSitemapIndexable(undefined)).toBe(false);
  });

  it('returns false when metaIndexStatus is null', () => {
    expect(isSitemapIndexable(null)).toBe(false);
  });

  it('returns false when metaIndexStatus contains noindex', () => {
    expect(isSitemapIndexable('noindex')).toBe(false);
  });

  it('returns false when metaIndexStatus contains NOINDEX', () => {
    expect(isSitemapIndexable('NOINDEX')).toBe(false);
  });

  it('returns true when metaIndexStatus is indexable', () => {
    expect(isSitemapIndexable('indexable')).toBe(true);
  });

  it('returns true when metaIndexStatus is Indexable', () => {
    expect(isSitemapIndexable('Indexable')).toBe(true);
  });
});

describe('buildSitemapXml', () => {
  it('builds valid sitemap XML', () => {
    const result = buildSitemapXml('https://example.com/page/');
    expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(result).toContain('<urlset');
    expect(result).toContain('<loc>https://example.com/page/</loc>');
  });
});
