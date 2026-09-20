import { describe, it, expect, vi } from 'vitest'
import { trackUmamiEvent } from './umami'

describe('trackUmamiEvent', () => {
  it('calls window.umami.track with the event', () => {
    const track = vi.fn()
    ;(window as any).umami = { track }

    trackUmamiEvent('test-event')

    expect(track).toHaveBeenCalledWith('test-event')
  })

  it('does nothing when umami is not available', () => {
    ;(window as any).umami = undefined

    trackUmamiEvent('test-event')

    // umami.track should not have been called
    const track = (window?.umami?.track?.mock?.calls?.length || 0)
    expect(track).toBe(0)
  })
})
