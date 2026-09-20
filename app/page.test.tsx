import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('../src/config/runtimeConfig', () => ({
  getRuntimeConfig: () => ({
    GA_TRACKING_ID: 'G-12345',
    UMAMI_WEBSITE_ID: 'UMI-123',
    UMAMI_APP_URL: 'https://umami.example.com',
    MATOMO_SITE_ID: '1',
    MATOMO_URL: 'https://matomo.example.com',
  }),
}))

vi.mock('../src/components/Home/Home', () => ({
  default: () => <div data-testid="mocked-home" />,
}))

vi.mock('../src/analytics/AnalyticsTracker', () => ({
  default: () => <div data-testid="mocked-tracker" />,
}))

import HomePage from './page'

describe('HomePage', () => {
  it('renders Home and AnalyticsTracker', () => {
    const { container } = render(<HomePage />)
    expect(container.querySelector('[data-testid="mocked-home"]')).not.toBeNull()
    expect(container.querySelector('[data-testid="mocked-tracker"]')).not.toBeNull()
  })
})
