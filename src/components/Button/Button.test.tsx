import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'

vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ className }: { className?: string }) => (
    <i className={className} data-testid="font-awesome-icon" />
  ),
}))

import Button from './Button'

describe('Button', () => {
  it('renders with default props', () => {
    const { container } = render(
      <Button href="https://example.com">Example</Button>,
    )
    const a = container.querySelector('a.button')
    expect(a).not.toBeNull()
    expect(a.getAttribute('href')).toBe('https://example.com')
    expect(a.getAttribute('target')).toBe('_blank')
    expect(a.getAttribute('rel')).toBe('noopener noreferrer')
    expect(a.dataset.analyticsEvent).toBeUndefined()
  })

  it('renders with name and analytics event', () => {
    const { container } = render(
      <Button name="twitter" href="https://twitter.com" displayName="Twitter">
        Twitter
      </Button>,
    )
    const a = container.querySelector('a.button')
    expect(a).not.toBeNull()
    expect(a.dataset.analyticsEvent).toBe('twitter-button')
    expect(a.getAttribute('title')).toBe('Twitter')
  })

  it('renders with custom styles', () => {
    const { container } = render(
      <Button styles={{ color: 'red', backgroundColor: 'blue' }}>Custom</Button>,
    )
    const a = container.querySelector('a.button')
    expect(a).not.toBeNull()
    expect(a.className).toContain('button')
    expect(a.style.color).toBe('red')
    expect(a.style.backgroundColor).toBe('blue')
  })

  it('renders with drop shadow light', () => {
    const { container } = render(
      <Button dropShadow="light">Light</Button>,
    )
    const a = container.querySelector('a.button')
    expect(a).not.toBeNull()
    expect(a.className).toContain('box-shadow-light')
  })

  it('renders with drop shadow heavy', () => {
    const { container } = render(
      <Button dropShadow="heavy">Heavy</Button>,
    )
    const a = container.querySelector('a.button')
    expect(a).not.toBeNull()
    expect(a.className).toContain('box-shadow-heavy')
  })

  it('renders with icon only', () => {
    const { container } = render(
      <Button icon="fab fa-github">GitHub</Button>,
    )
    const a = container.querySelector('a.button')
    expect(a).not.toBeNull()
    const icon = a.querySelector('.icon')
    expect(icon).not.toBeNull()
  })

  it('renders with logo only', () => {
    const { container } = render(
      <Button logo="/icons/github.svg" displayName="GitHub">GitHub</Button>,
    )
    const a = container.querySelector('a.button')
    expect(a).not.toBeNull()
    const img = a.querySelector('.icon')
    expect(img).not.toBeNull()
    expect(img.getAttribute('src')).toBe('/icons/github.svg')
    expect(img.getAttribute('alt')).toBe('GitHub logo')
  })

  it('renders with both icon and text', () => {
    const { container } = render(
      <Button name="github" icon="fab fa-github" displayName="GitHub">GitHub</Button>,
    )
    const a = container.querySelector('a.button')
    expect(a).not.toBeNull()
    expect(a.textContent).toContain('GitHub')
  })

  it('renders with custom buttonTarget', () => {
    const { container } = render(
      <Button buttonTarget="_self">Self</Button>,
    )
    const a = container.querySelector('a.button')
    expect(a.getAttribute('target')).toBe('_self')
  })

  it('renders with custom rels', () => {
    const { container } = render(
      <Button rels="nofollow sponsored">Link</Button>,
    )
    const a = container.querySelector('a.button')
    expect(a.getAttribute('rel')).toBe('nofollow sponsored')
  })
})
