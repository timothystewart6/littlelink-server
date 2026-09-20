import { describe, it, expect, vi } from 'vitest'
import { trackGoogleEvent } from './google'

describe('trackGoogleEvent', () => {
  it('calls window.gtag with the action', () => {
    const gtag = vi.fn()
    ;(window as any).gtag = gtag

    trackGoogleEvent('test-action')

    expect(gtag).toHaveBeenCalledWith('event', 'test-action')
  })

  it('does nothing when gtag is not available', () => {
    ;(window as any).gtag = undefined

    trackGoogleEvent('test-action')

    // window.gtag should not have been called
    expect((window?.gtag?.mock?.calls?.length || 0)).toBe(0)
  })
})
