import { describe, it, expect } from 'vitest'
import {
  isSitemapIndexable,
  normalizeSitemapUrl,
  getSitemapLocation,
  buildSitemapXml,
} from './sitemapXml'

describe('isSitemapIndexable', () => {
  it('returns true when META_INDEX_STATUS does not contain noindex', () => {
    expect(isSitemapIndexable('index')).toBe(true)
    expect(isSitemapIndexable('always')).toBe(true)
  })

  it('returns false when META_INDEX_STATUS contains noindex', () => {
    expect(isSitemapIndexable('noindex')).toBe(false)
    expect(isSitemapIndexable('noindex, index')).toBe(false)
    expect(isSitemapIndexable('')).toBe(false)
    expect(isSitemapIndexable(undefined)).toBe(false)
  })
})

describe('normalizeSitemapUrl', () => {
  it('returns url with trailing slash when pathname exists', () => {
    const result = normalizeSitemapUrl('https://example.com/page')
    expect(result).toBe('https://example.com/page/')
  })

  it('returns url unchanged when already has trailing slash', () => {
    const result = normalizeSitemapUrl('https://example.com/page/')
    expect(result).toBe('https://example.com/page/')
  })

  it('returns undefined for empty string', () => {
    expect(normalizeSitemapUrl('')).toBeUndefined()
  })

  it('returns undefined for undefined', () => {
    expect(normalizeSitemapUrl(undefined)).toBeUndefined()
  })

  it('returns undefined for non-http protocol', () => {
    expect(normalizeSitemapUrl('http://example.com')).toBe('http://example.com/')
    expect(normalizeSitemapUrl('ftp://example.com')).toBeUndefined()
  })

  it('handles pathname without path', () => {
    const result = normalizeSitemapUrl('https://example.com')
    expect(result).toBe('https://example.com/')
  })
})

describe('getSitemapLocation', () => {
  it('returns sitemap location when indexable and OG_URL provided', () => {
    const config = { META_INDEX_STATUS: 'index', OG_URL: 'https://example.com' }
    const result = getSitemapLocation(config as any)
    expect(result).toBe('https://example.com/')
  })

  it('returns undefined when not indexable', () => {
    const config = { META_INDEX_STATUS: 'noindex', OG_URL: 'https://example.com' }
    const result = getSitemapLocation(config as any)
    expect(result).toBeUndefined()
  })

  it('returns undefined when OG_URL missing', () => {
    const config = { META_INDEX_STATUS: 'index', OG_URL: undefined }
    const result = getSitemapLocation(config as any)
    expect(result).toBeUndefined()
  })
})

describe('buildSitemapXml', () => {
  it('generates valid sitemap XML', () => {
    const result = buildSitemapXml('https://example.com/')
    expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(result).toContain('<urlset')
    expect(result).toContain('<loc>https://example.com/</loc>')
    expect(result).toContain('<changefreq>weekly</changefreq>')
    expect(result).toContain('<priority>1.0</priority>')
  })
})
