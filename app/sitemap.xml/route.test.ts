import { describe, it, expect } from 'vitest';
import { getRuntimeConfig } from '../../src/config/runtimeConfig';
import {
  getSitemapLocation,
  buildSitemapXml,
} from '../../src/sitemap/sitemapXml';
import { NextResponse } from 'next/server';

describe('sitemap.xml route', () => {
  it('returns 404 when sitemap is not indexable', () => {
    const config = getRuntimeConfig({ META_INDEX_STATUS: 'noindex' });
    const location = getSitemapLocation(config);
    expect(location).toBeUndefined();
  });

  it('returns sitemap XML when indexable with OG_URL', () => {
    const config = getRuntimeConfig({
      META_INDEX_STATUS: 'index',
      OG_URL: 'https://example.com',
    });
    const location = getSitemapLocation(config);
    expect(location).toBe('https://example.com/');
    const xml = buildSitemapXml(location!);
    expect(xml).toContain('<loc>https://example.com/</loc>');
  });

  it('returns 404 when OG_URL is undefined', () => {
    const config = getRuntimeConfig({ META_INDEX_STATUS: 'index' });
    const location = getSitemapLocation(config);
    expect(location).toBeUndefined();
  });

  it('route GET handler builds sitemap with location', async () => {
    const originalEnv = { ...process.env };
    process.env.META_INDEX_STATUS = 'index';
    process.env.OG_URL = 'https://example.com';
    try {
      const routeModule = await import('./route');
      const result = await routeModule.GET();
      expect(result).toBeInstanceOf(NextResponse);
      const body = await result.text();
      expect(body).toContain('<urlset');
    } finally {
      process.env = originalEnv;
    }
  });

  it('route GET handler returns 404 when no location', async () => {
    const originalEnv = { ...process.env };
    process.env.META_INDEX_STATUS = 'noindex';
    try {
      const routeModule = await import('./route');
      const result = await routeModule.GET();
      expect(result).toBeInstanceOf(NextResponse);
      expect(result.status).toBe(404);
    } finally {
      process.env = originalEnv;
    }
  });
});
