import { describe, it, expect } from 'vitest'
import { GET } from './route'

describe('healthcheck route', () => {
  it('returns ok status', async () => {
    const response = await GET()
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: 'ok' })
  })
})
