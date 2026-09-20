import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import AnalyticsTracker from './AnalyticsTracker'

describe('AnalyticsTracker', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders without errors', () => {
    const { container } = render(<AnalyticsTracker />)
    expect(container).toBeDefined()
  })

  it('forwards Google events when GA_TRACKING_ID is set', () => {
    const gtag = vi.fn()
    ;(window as any).gtag = gtag
    render(<AnalyticsTracker gaTrackingId="G-12345" />)

    const link = document.createElement('a')
    link.setAttribute('data-analytics-event', 'github-button')
    document.body.appendChild(link)
    link.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(gtag).toHaveBeenCalledWith('event', 'github-button')
  })

  it('does not forward Google events when GA_TRACKING_ID is not set', () => {
    const gtag = vi.fn()
    ;(window as any).gtag = gtag
    render(<AnalyticsTracker />)

    const link = document.createElement('a')
    link.setAttribute('data-analytics-event', 'github-button')
    document.body.appendChild(link)
    link.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(gtag).not.toHaveBeenCalled()
  })

  it('forwards Umami events when UMAMI is configured', () => {
    const track = vi.fn()
    ;(window as any).umami = { track }
    render(
      <AnalyticsTracker
        umamiWebsiteId="UMI-123"
        umamiAppUrl="https://umami.example.com"
      />,
    )

    const link = document.createElement('a')
    link.setAttribute('data-analytics-event', 'twitter-button')
    document.body.appendChild(link)
    link.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(track).toHaveBeenCalledWith('twitter-button')
  })

  it('forwards Matomo events when MATOMO is configured', () => {
    const paq: unknown[] = []
    ;(window as any)._paq = paq
    render(
      <AnalyticsTracker
        matomoSiteId="1"
        matomoUrl="https://matomo.example.com"
      />,
    )

    const link = document.createElement('a')
    link.setAttribute('data-analytics-event', 'youtube-button')
    document.body.appendChild(link)
    link.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(paq).toContainEqual(['trackEvent', 'youtube-button'])
  })

  it('ignores clicks on elements without data-analytics-event', () => {
    const gtag = vi.fn()
    ;(window as any).gtag = gtag
    render(<AnalyticsTracker gaTrackingId="G-12345" />)

    const div = document.createElement('div')
    document.body.appendChild(div)
    div.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(gtag).not.toHaveBeenCalled()
  })

  it('ignores clicks on non-element targets', () => {
    const gtag = vi.fn()
    ;(window as any).gtag = gtag
    render(<AnalyticsTracker gaTrackingId="G-12345" />)

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(gtag).not.toHaveBeenCalled()
  })
})
