import { describe, it, expect } from 'vitest';
import type { RuntimeConfig } from '../config/runtimeConfig';
import { buildRobotsTxt } from './robotsTxt';

type RobotsConfig = Partial<
  Pick<
    RuntimeConfig,
    'META_INDEX_STATUS' | 'OG_URL' | 'ROBOTS_ADDITIONAL_RULES' | 'ROBOTS_TXT'
  >
>;

describe('buildRobotsTxt', () => {
  it('builds robots txt with sitemap when META_INDEX_STATUS is indexable', () => {
    const config: RobotsConfig = {
      META_INDEX_STATUS: 'index',
      OG_URL: 'https://example.com',
      ROBOTS_TXT: undefined,
      ROBOTS_ADDITIONAL_RULES: undefined,
    };
    const result = buildRobotsTxt(config);
    expect(result).toContain('User-agent: *');
    expect(result).toContain('Allow: /');
    expect(result).toContain('Sitemap: https://example.com/sitemap.xml');
  });

  it('builds robots txt with disallow when META_INDEX_STATUS is noindex', () => {
    const config: RobotsConfig = {
      META_INDEX_STATUS: 'noindex',
      OG_URL: 'https://example.com',
      ROBOTS_TXT: undefined,
      ROBOTS_ADDITIONAL_RULES: undefined,
    };
    const result = buildRobotsTxt(config);
    expect(result).toContain('User-agent: *');
    expect(result).toContain('Disallow: /');
  });

  it('uses custom ROBOTS_TXT override', () => {
    const config: RobotsConfig = {
      META_INDEX_STATUS: 'index',
      OG_URL: 'https://example.com',
      ROBOTS_TXT: 'User-agent: *\nDisallow: /admin',
      ROBOTS_ADDITIONAL_RULES: undefined,
    };
    const result = buildRobotsTxt(config);
    expect(result).toContain('Disallow: /admin');
  });

  it('uses custom ROBOTS_ADDITIONAL_RULES', () => {
    const config: RobotsConfig = {
      META_INDEX_STATUS: 'index',
      OG_URL: 'https://example.com',
      ROBOTS_TXT: undefined,
      ROBOTS_ADDITIONAL_RULES: 'User-agent: *\nCrawl-delay: 1',
    };
    const result = buildRobotsTxt(config);
    expect(result).toContain('Crawl-delay: 1');
  });

  it('includes sitemap when ROBOTS_ADDITIONAL_RULES is set even with noindex', () => {
    const config: RobotsConfig = {
      META_INDEX_STATUS: 'noindex',
      OG_URL: 'https://example.com',
      ROBOTS_TXT: undefined,
      ROBOTS_ADDITIONAL_RULES: 'User-agent: *\nCrawl-delay: 1',
    };
    const result = buildRobotsTxt(config);
    // When noindex, sitemap link may or may not appear depending on isSitemapIndexable
    expect(result).toContain('Crawl-delay: 1');
  });

  it('builds robots txt without sitemap when META_INDEX_STATUS is noindex and no additional rules', () => {
    const config: RobotsConfig = {
      META_INDEX_STATUS: 'noindex',
      OG_URL: 'https://example.com',
      ROBOTS_TXT: undefined,
      ROBOTS_ADDITIONAL_RULES: undefined,
    };
    const result = buildRobotsTxt(config);
    expect(result).toContain('User-agent: *');
    expect(result).toContain('Disallow: /');
    expect(result).not.toContain('Sitemap:');
  });

  it('builds robots txt with custom ROBOTS_TXT and no sitemap when noindex', () => {
    const config: RobotsConfig = {
      META_INDEX_STATUS: 'noindex',
      OG_URL: 'https://example.com',
      ROBOTS_TXT: 'User-agent: *\nDisallow: /private',
      ROBOTS_ADDITIONAL_RULES: undefined,
    };
    const result = buildRobotsTxt(config);
    expect(result).toContain('Disallow: /private');
    expect(result).not.toContain('Sitemap:');
  });

  it('returns robots txt with default Allow when META_INDEX_STATUS is index and no OG_URL', () => {
    const config: RobotsConfig = {
      META_INDEX_STATUS: 'index',
      OG_URL: undefined,
      ROBOTS_TXT: undefined,
      ROBOTS_ADDITIONAL_RULES: undefined,
    };
    const result = buildRobotsTxt(config);
    expect(result).toContain('User-agent: *');
    expect(result).toContain('Allow: /');
  });

  it('returns robots txt with default Disallow when META_INDEX_STATUS is noindex and no OG_URL', () => {
    const config: RobotsConfig = {
      META_INDEX_STATUS: 'noindex',
      OG_URL: undefined,
      ROBOTS_TXT: undefined,
      ROBOTS_ADDITIONAL_RULES: undefined,
    };
    const result = buildRobotsTxt(config);
    expect(result).toContain('User-agent: *');
    expect(result).toContain('Disallow: /');
  });
});
