import React from 'react'
import { describe, it, expect, vi } from 'vitest'

const mockConfig = {
  META_TITLE: 'Test Site',
  META_DESCRIPTION: 'A test description',
  META_AUTHOR: 'Test Author',
  META_KEYWORDS: 'test, keywords',
  META_INDEX_STATUS: 'index',
  OG_TITLE: 'OG Title',
  OG_DESCRIPTION: 'OG Description',
  OG_SITE_NAME: 'OG Site',
  OG_URL: 'https://example.com',
  OG_IMAGE: 'https://example.com/image.png',
  OG_IMAGE_WIDTH: '1200',
  OG_IMAGE_HEIGHT: '630',
  TWITTER_CARD: 'summary_large_image',
  TWITTER_TITLE: 'Twitter Title',
  TWITTER_DESCRIPTION: 'Twitter Description',
  TWITTER_IMAGE: 'https://example.com/twitter.png',
  TWITTER_SITE: '@site',
  TWITTER_CREATOR: '@creator',
  LANG: 'en',
  THEME: 'dark',
  THEME_OS: true,
  FAVICON_URL: 'https://example.com/favicon.png',
}

vi.mock('../src/config/runtimeConfig', () => ({
  getRuntimeConfig: () => mockConfig,
  getTheme: () => 'dark',
}))

import RootLayout, { generateMetadata } from './layout'

describe('layout generateMetadata', () => {
  it('returns metadata from config', async () => {
    const metadata = await generateMetadata()
    expect(metadata.title).toBe('Test Site')
    expect(metadata.description).toBe('A test description')
    expect(metadata.authors).toEqual([{ name: 'Test Author' }])
    expect(metadata.keywords).toBe('test, keywords')
    expect(metadata.robots).toBe('index')
    expect(metadata.openGraph?.title).toBe('OG Title')
    expect(metadata.openGraph?.images).toEqual([
      {
        url: 'https://example.com/image.png',
        secureUrl: 'https://example.com/image.png',
        width: 1200,
        height: 630,
      },
    ])
    expect(metadata.twitter?.card).toBe('summary_large_image')
    expect(metadata.twitter?.site).toBe('@site')
    expect(metadata.other).toEqual({ author: 'Test Author' })
  })

  it('handles missing optional fields', async () => {
    ;(mockConfig as any).META_TITLE = ''
    ;(mockConfig as any).META_DESCRIPTION = ''
    ;(mockConfig as any).META_AUTHOR = ''
    ;(mockConfig as any).META_KEYWORDS = ''
    ;(mockConfig as any).META_INDEX_STATUS = ''
    ;(mockConfig as any).OG_TITLE = ''
    ;(mockConfig as any).OG_DESCRIPTION = ''
    ;(mockConfig as any).OG_SITE_NAME = ''
    ;(mockConfig as any).OG_URL = ''
    ;(mockConfig as any).OG_IMAGE = ''
    ;(mockConfig as any).OG_IMAGE_WIDTH = ''
    ;(mockConfig as any).OG_IMAGE_HEIGHT = ''
    ;(mockConfig as any).TWITTER_CARD = ''
    ;(mockConfig as any).TWITTER_TITLE = ''
    ;(mockConfig as any).TWITTER_DESCRIPTION = ''
    ;(mockConfig as any).TWITTER_IMAGE = ''
    ;(mockConfig as any).TWITTER_SITE = ''
    ;(mockConfig as any).TWITTER_CREATOR = ''
    ;(mockConfig as any).THEME_OS = false
    ;(mockConfig as any).FAVICON_URL = ''

    const metadata = await generateMetadata()
    expect(metadata.title).toBe('My Site')
    expect(metadata.description).toBeUndefined()
    expect(metadata.authors).toBeUndefined()
    expect(metadata.keywords).toBeUndefined()
    expect(metadata.robots).toBe('noindex')
    expect(metadata.openGraph?.title).toBeUndefined()
    expect(metadata.openGraph?.images).toEqual([])
    expect(metadata.twitter?.card).toBeUndefined()
    expect(metadata.other).toEqual({})
  })
})

describe('RootLayout', () => {
  it('returns a React element with html root', async () => {
    const element = await RootLayout({ children: <div>Test children</div> })
    expect(element).toBeDefined()
    expect(element.type).toBe('html')
    expect(element.props.lang).toBe('en')
    expect(element.props.className).toBe('dark')
  })

  it('renders children in the body', async () => {
    const element = await RootLayout({ children: <div data-testid="child">Hello</div> })
    expect(element).toBeDefined()
    const body = element.props.children
    expect(body).toBeDefined()
  })

  it('handles missing LANG config', async () => {
    ;(mockConfig as any).LANG = ''
    const element = await RootLayout({ children: null })
    expect(element).toBeDefined()
    expect(element.props.lang).toBe('en')
  })

  it('handles missing THEME_OS config', async () => {
    ;(mockConfig as any).THEME_OS = false
    const element = await RootLayout({ children: null })
    expect(element).toBeDefined()
    // theme class should not be applied when THEME_OS is false
    expect(element.props.className).toBe('dark')
  })

  it('renders os stylesheet when THEME_OS is true', async () => {
    ;(mockConfig as any).THEME_OS = true
    const element = await RootLayout({ children: null })
    expect(element).toBeDefined()
    // Find the head element and check for os.css stylesheet
    const head = element.props.children?.find(
      (child: any) => child.type === 'head'
    )
    expect(head).toBeDefined()
    const headChildren = head.props.children
    let foundOsCss = false
    if (headChildren) {
      React.Children.forEach(headChildren, (child: any) => {
        if (child.props?.href === 'css/os.css') {
          foundOsCss = true
        }
      })
    }
    expect(foundOsCss).toBe(true)
  })

  it('handles missing FAVICON_URL config', async () => {
    ;(mockConfig as any).FAVICON_URL = ''
    const element = await RootLayout({ children: null })
    expect(element).toBeDefined()
    // no favicon link should be rendered
    const head = element.props.children?.find(
      (child: any) => child.type === 'head'
    )
    expect(head).toBeDefined()
    const headChildren = head.props.children
    let foundFavicon = false
    if (headChildren) {
      React.Children.forEach(headChildren, (child: any) => {
        if (child.props?.href && child.props.href.includes('favicon')) {
          foundFavicon = true
        }
      })
    }
    expect(foundFavicon).toBe(false)
  })

  it('renders favicon when FAVICON_URL is set', async () => {
    ;(mockConfig as any).FAVICON_URL = 'https://example.com/favicon.png'
    const element = await RootLayout({ children: null })
    expect(element).toBeDefined()
    const head = element.props.children?.find(
      (child: any) => child.type === 'head'
    )
    expect(head).toBeDefined()
    const headChildren = head.props.children
    let foundFavicon = false
    if (headChildren) {
      React.Children.forEach(headChildren, (child: any) => {
        if (child.props?.href && child.props.href.includes('favicon')) {
          foundFavicon = true
        }
      })
    }
    expect(foundFavicon).toBe(true)
  })
})
