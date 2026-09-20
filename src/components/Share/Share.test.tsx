import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ className }: { className?: string }) => (
    <i className={className} data-testid="font-awesome-icon" />
  ),
}))

import Share from './Share'

describe('Share', () => {
  it('renders sharing link without navigator.share', () => {
    ;(navigator as any).share = undefined
    const { container } = render(
      <Share url="https://example.com" title="Test" text="Share test" />
    )
    const link = container.querySelector('a.button')
    expect(link).not.toBeNull()
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')
    const event = new MouseEvent('click', { bubbles: true })
    link.dispatchEvent(event)
    expect((navigator as any).share).toBeUndefined()
  })

  it('attempts navigator.share when available', async () => {
    ;(navigator as any).share = vi.fn().mockResolvedValue(true)
    const { container } = render(
      <Share url="https://example.com" title="Test" text="Share test" />
    )
    const link = container.querySelector('a.button')
    expect(link).not.toBeNull()
    const event = new MouseEvent('click', { bubbles: true })
    link.dispatchEvent(event)
    expect((navigator as any).share).toHaveBeenCalledWith({
      url: 'https://example.com',
      title: 'Test',
      text: 'Share test',
    })
  })

  it('renders with navigator.share mock during render', () => {
    ;(navigator as any).share = vi.fn().mockResolvedValue(true)
    const { container } = render(
      <Share url="https://example.com" title="Test" text="Share test" />
    )
    const link = container.querySelector('a.button')
    expect(link).not.toBeNull()
    // Verify the anchor has the share icon
    const icon = link.querySelector('i')
    expect(icon).not.toBeNull()
    expect(icon.getAttribute('data-testid')).toBe('font-awesome-icon')
  })
})
