import { describe, it, expect } from 'vitest';
import { getRuntimeConfig } from '../../src/config/runtimeConfig';
import { buildRobotsTxt } from '../../src/robots/robotsTxt';
import { NextResponse } from 'next/server';

describe('robots.txt route', () => {
  it('includes sitemap when indexable', () => {
    const config = getRuntimeConfig({
      META_INDEX_STATUS: 'index',
      OG_URL: 'https://example.com',
      ROBOTS_TXT: undefined,
      ROBOTS_ADDITIONAL_RULES: undefined,
    });
    const result = buildRobotsTxt(config);
    expect(result).toContain('Sitemap: https://example.com/sitemap.xml');
  });

  it('disallows when noindex', () => {
    const config = getRuntimeConfig({
      META_INDEX_STATUS: 'noindex',
      OG_URL: 'https://example.com',
      ROBOTS_TXT: undefined,
      ROBOTS_ADDITIONAL_RULES: undefined,
    });
    const result = buildRobotsTxt(config);
    expect(result).toContain('Disallow: /');
  });

  it('uses custom ROBOTS_TXT', () => {
    const config = getRuntimeConfig({
      META_INDEX_STATUS: 'index',
      OG_URL: 'https://example.com',
      ROBOTS_TXT: 'User-agent: *\nDisallow: /private',
      ROBOTS_ADDITIONAL_RULES: undefined,
    });
    const result = buildRobotsTxt(config);
    expect(result).toContain('Disallow: /private');
  });

  it('route GET handler builds robots.txt with default config', async () => {
    const cfg = getRuntimeConfig();
    const routeModule = await import('./route');
    const result = await routeModule.GET();
    expect(result).toBeInstanceOf(NextResponse);
    const body = await result.text();
    expect(body).toContain('Disallow: /');
  });

  it('route GET handler builds robots.txt with noindex config', async () => {
    const cfg = getRuntimeConfig({
      META_INDEX_STATUS: 'noindex',
    });
    const routeModule = await import('./route');
    const result = await routeModule.GET();
    expect(result).toBeInstanceOf(NextResponse);
    const body = await result.text();
    expect(body).toContain('Disallow: /');
    expect(body).not.toContain('Sitemap:');
  });
});
