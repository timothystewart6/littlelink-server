import {
  buildSitemapXml,
  getSitemapLocation,
  isSitemapIndexable,
  normalizeSitemapUrl,
} from '../../sitemap/sitemapXml';

describe('sitemap XML helpers', () => {
  test('uses OG_URL when indexing is enabled', () => {
    expect(
      getSitemapLocation({
        META_INDEX_STATUS: 'all',
        OG_URL: 'https://links.example.com',
      }),
    ).toBe('https://links.example.com/');
  });

  test('does not publish a sitemap URL when indexing is disabled', () => {
    expect(
      getSitemapLocation({
        META_INDEX_STATUS: 'noindex',
        OG_URL: 'https://links.example.com',
      }),
    ).toBeUndefined();
  });

  test('does not publish a sitemap URL without an OG_URL', () => {
    expect(
      getSitemapLocation({ META_INDEX_STATUS: 'all', OG_URL: undefined }),
    ).toBeUndefined();
  });

  test('normalizes public http and https URLs', () => {
    expect(normalizeSitemapUrl(' https://example.com/profile ')).toBe(
      'https://example.com/profile/',
    );
    expect(normalizeSitemapUrl('http://example.com/#section')).toBe(
      'http://example.com/',
    );
  });

  test('rejects invalid or unsupported URLs', () => {
    expect(normalizeSitemapUrl('not a url')).toBeUndefined();
    expect(normalizeSitemapUrl('mailto:test@example.com')).toBeUndefined();
  });

  test('requires an explicit indexable status', () => {
    expect(isSitemapIndexable(undefined)).toBe(false);
    expect(isSitemapIndexable('all')).toBe(true);
    expect(isSitemapIndexable('index,follow')).toBe(true);
    expect(isSitemapIndexable('noindex,nofollow')).toBe(false);
  });

  test('escapes sitemap locations in XML output', () => {
    const xml = buildSitemapXml('https://example.com/?name=Tom&title="Owner"');

    expect(xml).toContain(
      '<loc>https://example.com/?name=Tom&amp;title=&quot;Owner&quot;</loc>',
    );
    expect(xml).toContain('<changefreq>weekly</changefreq>');
    expect(xml).toContain('<priority>1.0</priority>');
  });
});
