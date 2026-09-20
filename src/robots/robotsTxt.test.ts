import { describe, it, expect } from 'vitest'
import { buildRobotsTxt } from './robotsTxt'

describe('buildRobotsTxt', () => {
  it('includes sitemap when META_INDEX_STATUS allows indexing', () => {
    const config = {
      META_INDEX_STATUS: 'index',
      OG_URL: 'https://example.com',
      ROBOTS_ADDITIONAL_RULES: undefined,
      ROBOTS_TXT: undefined,
    }
    const result = buildRobotsTxt(config as any)
    expect(result).toContain('Sitemap: https://example.com/sitemap.xml')
    expect(result).toContain('User-agent: *')
    expect(result).toContain('Allow: /')
  })

  it('disallows when META_INDEX_STATUS has noindex', () => {
    const config = {
      META_INDEX_STATUS: 'noindex',
      OG_URL: 'https://example.com',
      ROBOTS_ADDITIONAL_RULES: undefined,
      ROBOTS_TXT: undefined,
    }
    const result = buildRobotsTxt(config as any)
    expect(result).toContain('Disallow: /')
    expect(result).not.toContain('Sitemap:')
  })

  it('respects ROBOTS_TXT override', () => {
    const config = {
      META_INDEX_STATUS: 'noindex',
      OG_URL: undefined,
      ROBOTS_ADDITIONAL_RULES: undefined,
      ROBOTS_TXT: 'User-agent: *\nDisallow: /private',
    }
    const result = buildRobotsTxt(config as any)
    expect(result).toContain('User-agent: *')
    expect(result).toContain('Disallow: /private')
    // When ROBOTS_TXT is set, the default 'Disallow: /' should not appear
    expect(result).not.toMatch(/Disallow: \/$/)
  })

  it('includes additional rules when provided', () => {
    const config = {
      META_INDEX_STATUS: 'index',
      OG_URL: 'https://example.com',
      ROBOTS_ADDITIONAL_RULES: 'Disallow: /admin\nAllow: /public',
      ROBOTS_TXT: undefined,
    }
    const result = buildRobotsTxt(config as any)
    expect(result).toContain('Disallow: /admin')
    expect(result).toContain('Allow: /public')
    expect(result).toContain('Sitemap: https://example.com/sitemap.xml')
  })
})
