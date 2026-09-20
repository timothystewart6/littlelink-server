import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Avatar from './Avatar'

describe('Avatar', () => {
  it('renders with default props', () => {
    const { container } = render(<Avatar />)
    const img = container.querySelector('img.avatar')
    expect(img).not.toBeNull()
    expect(img.getAttribute('src')).toBeNull()
    expect(img.getAttribute('alt')).toBeNull()
  })

  it('renders with all props', () => {
    const { container } = render(
      <Avatar
        src="https://example.com/avatar.png"
        srcSet="https://example.com/avatar-2x.png 2x"
        alt="Test Avatar"
        avatarSize="200px"
        dropShadow="medium"
      >
      </Avatar>,
    )
    const img = container.querySelector('img.avatar')
    expect(img).not.toBeNull()
    expect(img.getAttribute('src')).toBe('https://example.com/avatar.png')
    expect(img.getAttribute('srcSet')).toBe('https://example.com/avatar-2x.png 2x')
    expect(img.getAttribute('alt')).toBe('Test Avatar')
    expect(img.style.width).toBe('200px')
    expect(img.style.height).toBe('200px')
    expect(img.className).toContain('box-shadow-medium')
  })

  it('renders with light drop shadow', () => {
    const { container } = render(
      <Avatar src="https://example.com/avatar.png" dropShadow="light" />
    )
    const img = container.querySelector('img.avatar')
    expect(img.className).toContain('box-shadow-light')
  })

  it('renders with heavy drop shadow', () => {
    const { container } = render(
      <Avatar src="https://example.com/avatar.png" dropShadow="heavy" />
    )
    const img = container.querySelector('img.avatar')
    expect(img.className).toContain('box-shadow-heavy')
  })

  it('renders without drop shadow when undefined', () => {
    const { container } = render(<Avatar src="https://example.com/avatar.png" />)
    const img = container.querySelector('img.avatar')
    expect(img.className).not.toContain('box-shadow-light')
    expect(img.className).not.toContain('box-shadow-medium')
    expect(img.className).not.toContain('box-shadow-heavy')
  })
})
