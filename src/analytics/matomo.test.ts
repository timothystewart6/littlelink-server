import { describe, it, expect, vi } from 'vitest'
import { trackMatomoEvent } from './matomo'

describe('trackMatomoEvent', () => {
  it('calls window._paq.push with the event', () => {
    const paq: unknown[] = []
    ;(window as any)._paq = paq

    trackMatomoEvent('test-event')

    expect(paq).toHaveLength(1)
    expect(paq[0]).toEqual(['trackEvent', 'test-event'])
  })

  it('does nothing when _paq is not available', () => {
    ;(window as any)._paq = undefined

    trackMatomoEvent('test-event')

    // _paq should not have been pushed
    expect((window?._paq?.length || 0)).toBe(0)
  })
})
