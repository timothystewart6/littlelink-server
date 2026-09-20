import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'

vi.mock('next/script', () => {
  return {
    default: ({
      id,
      src,
      children,
      ...rest
    }: {
      id?: string
      src?: string
      children?: React.ReactNode
      [key: string]: unknown
    }) => (
      <script id={id} src={src} {...rest}>
        {children}
      </script>
    ),
  }
})

import AnalyticsScripts from './AnalyticsScripts'

describe('AnalyticsScripts', () => {
  it('renders Google Analytics when GA_TRACKING_ID is set', () => {
    const config = {
      GA_TRACKING_ID: 'G-12345',
      UMAMI_WEBSITE_ID: undefined,
      UMAMI_APP_URL: undefined,
      MATOMO_URL: undefined,
      MATOMO_SITE_ID: undefined,
      PLAUSIBLE_DATA_DOMAIN: undefined,
      PLAUSIBLE_DATA_API: undefined,
      PLAUSIBLE_URL: undefined,
    }
    const { container } = render(<AnalyticsScripts config={config as any} />)
    expect(container.querySelector('#ga-script')).not.toBeNull()
    expect(container.querySelector('#ga-init')).not.toBeNull()
  })

  it('renders Umami when UMAMI_WEBSITE_ID and UMAMI_APP_URL are set', () => {
    const config = {
      GA_TRACKING_ID: undefined,
      UMAMI_WEBSITE_ID: 'UMI-123',
      UMAMI_APP_URL: 'https://umami.example.com',
      MATOMO_URL: undefined,
      MATOMO_SITE_ID: undefined,
      PLAUSIBLE_DATA_DOMAIN: undefined,
      PLAUSIBLE_DATA_API: undefined,
      PLAUSIBLE_URL: undefined,
    }
    const { container } = render(<AnalyticsScripts config={config as any} />)
    expect(container.querySelector('#umami-script')).not.toBeNull()
  })

  it('renders Matomo when MATOMO_URL and MATOMO_SITE_ID are set', () => {
    const config = {
      GA_TRACKING_ID: undefined,
      UMAMI_WEBSITE_ID: undefined,
      UMAMI_APP_URL: undefined,
      MATOMO_URL: 'https://matomo.example.com',
      MATOMO_SITE_ID: '1',
      PLAUSIBLE_DATA_DOMAIN: undefined,
      PLAUSIBLE_DATA_API: undefined,
      PLAUSIBLE_URL: undefined,
    }
    const { container } = render(<AnalyticsScripts config={config as any} />)
    expect(container.querySelector('#matomo-init')).not.toBeNull()
  })

  it('renders Plausible when PLAUSIBLE_DATA_DOMAIN, PLAUSIBLE_DATA_API, and PLAUSIBLE_URL are set', () => {
    const config = {
      GA_TRACKING_ID: undefined,
      UMAMI_WEBSITE_ID: undefined,
      UMAMI_APP_URL: undefined,
      MATOMO_URL: undefined,
      MATOMO_SITE_ID: undefined,
      PLAUSIBLE_DATA_DOMAIN: 'plausible.example.com',
      PLAUSIBLE_DATA_API: 'https://api.plausible.io',
      PLAUSIBLE_URL: 'https://plausible.example.com',
    }
    const { container } = render(<AnalyticsScripts config={config as any} />)
    expect(container.querySelector('#plausible-script')).not.toBeNull()
  })

  it('renders no scripts when no analytics are configured', () => {
    const config = {
      GA_TRACKING_ID: undefined,
      UMAMI_WEBSITE_ID: undefined,
      UMAMI_APP_URL: undefined,
      MATOMO_URL: undefined,
      MATOMO_SITE_ID: undefined,
      PLAUSIBLE_DATA_DOMAIN: undefined,
      PLAUSIBLE_DATA_API: undefined,
      PLAUSIBLE_URL: undefined,
    }
    const { container } = render(<AnalyticsScripts config={config as any} />)
    expect(container.querySelector('script')).toBeNull()
  })
})
