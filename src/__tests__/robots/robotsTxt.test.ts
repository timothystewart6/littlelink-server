import { buildRobotsTxt } from '../../robots/robotsTxt';

describe('buildRobotsTxt', () => {
  test('allows indexable pages and links to the sitemap', () => {
    expect(
      buildRobotsTxt({
        META_INDEX_STATUS: 'all',
        OG_URL: 'https://links.example.com',
      }),
    ).toBe(
      'User-agent: *\nAllow: /\n\nSitemap: https://links.example.com/sitemap.xml\n',
    );
  });

  test('disallows crawling when indexing is disabled', () => {
    expect(
      buildRobotsTxt({
        META_INDEX_STATUS: 'noindex',
        OG_URL: 'https://links.example.com',
      }),
    ).toBe('User-agent: *\nDisallow: /\n');
  });

  test('disallows crawling when index status is not configured', () => {
    expect(buildRobotsTxt({})).toBe('User-agent: *\nDisallow: /\n');
  });

  test('appends crawler-specific additional rules', () => {
    expect(
      buildRobotsTxt({
        META_INDEX_STATUS: 'all',
        OG_URL: 'https://links.example.com',
        ROBOTS_ADDITIONAL_RULES:
          'User-agent: GPTBot\\nDisallow: /\\n\\nUser-agent: Googlebot\\nDisallow: /',
      }),
    ).toBe(
      'User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nDisallow: /\n\nUser-agent: Googlebot\nDisallow: /\n\nSitemap: https://links.example.com/sitemap.xml\n',
    );
  });

  test('uses ROBOTS_TXT as a full override', () => {
    expect(
      buildRobotsTxt({
        META_INDEX_STATUS: 'all',
        OG_URL: 'https://links.example.com',
        ROBOTS_TXT: 'User-agent: *\\nDisallow: /private',
      }),
    ).toBe('User-agent: *\nDisallow: /private\n');
  });
});
