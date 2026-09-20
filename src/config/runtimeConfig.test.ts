import { describe, it, expect } from 'vitest'
import { getRuntimeConfig, getTheme, shouldSkipHealthLog } from './runtimeConfig'

describe('runtimeConfig', () => {
  it('getRuntimeConfig reads from env', () => {
    const cfg = getRuntimeConfig({ META_TITLE: 'Test' })
    expect(cfg.META_TITLE).toBe('Test')
  })

  it('getRuntimeConfig uses process.env when no env passed', () => {
    const cfg = getRuntimeConfig()
    expect(cfg).toBeDefined()
  })

  it('getTheme returns dark for THEME=Dark', () => {
    expect(getTheme({ THEME: 'Dark' } as any)).toBe('dark')
  })

  it('getTheme returns light for other values', () => {
    expect(getTheme({ THEME: 'dark' } as any)).toBe('light')
    expect(getTheme({ THEME: 'light' } as any)).toBe('light')
    expect(getTheme({} as any)).toBe('light')
  })

  it('shouldSkipHealthLog returns true when SKIP_HEALTH_CHECK_LOGS=true', () => {
    expect(shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: 'true' } as any)).toBe(true)
  })

  it('shouldSkipHealthLog returns false for other values', () => {
    expect(shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: 'false' } as any)).toBe(false)
    expect(shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: undefined } as any)).toBe(false)
  })
})
