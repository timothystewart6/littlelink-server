import { describe, it, expect, vi } from 'vitest'

vi.mock('../../src/config/runtimeConfig', () => ({
  getRuntimeConfig: () => ({
    META_INDEX_STATUS: 'index',
  }),
}))

vi.mock('../../src/robots/robotsTxt', () => ({
  buildRobotsTxt: () => 'User-agent: *\nDisallow: /admin',
}))

import { GET } from './route'

describe('robots.txt route', () => {
  it('returns robots txt content', async () => {
    const response = await GET()
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('text/plain')
    const body = await response.text()
    expect(body).toContain('User-agent')
  })
})
