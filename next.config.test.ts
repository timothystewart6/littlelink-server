import { describe, it, expect } from 'vitest'
import nextConfig from './next.config'

describe('next.config', () => {
  it('has output set to standalone', () => {
    expect(nextConfig.output).toBe('standalone')
  })

  it('has poweredByHeader set to false', () => {
    expect(nextConfig.poweredByHeader).toBe(false)
  })

  it('has reactStrictMode set to true', () => {
    expect(nextConfig.reactStrictMode).toBe(true)
  })
})
