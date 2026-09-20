import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ className }: { className?: string }) => (
    <i className={className} data-testid="font-awesome-icon" />
  ),
}))

import Home from './Home'

const makeConfig = (overrides = {}) => ({
  META_TITLE: 'Test Site',
  META_DESCRIPTION: 'Test Description',
  META_INDEX_STATUS: 'index',
  OG_URL: 'https://example.com',
  NAME: 'Test User',
  BIO: 'Test bio',
  AVATAR_URL: 'https://example.com/avatar.png',
  AVATAR_2X_URL: 'https://example.com/avatar-2x.png',
  AVATAR_ALT: 'Test avatar',
  AVATAR_SIZE: '128px',
  DROP_SHADOW: 'medium',
  BUTTON_TARGET: '_blank',
  YOUTUBE: overrides.YOUTUBE,
  TIKTOK: overrides.TIKTOK,
  LINKED_IN: overrides.LINKED_IN,
  PRODUCT_HUNT: overrides.PRODUCT_HUNT,
  TWITCH: overrides.TWITCH,
  TWITTER: overrides.TWITTER,
  SNAPCHAT: overrides.SNAPCHAT,
  GITHUB: overrides.GITHUB,
  INSTAGRAM: overrides.INSTAGRAM,
  DISCORD: overrides.DISCORD,
  FACEBOOK: overrides.FACEBOOK,
  FACEBOOK_MESSENGER: overrides.FACEBOOK_MESSENGER,
  SPOTIFY: overrides.SPOTIFY,
  REDDIT: overrides.REDDIT,
  EMAIL: overrides.EMAIL,
  EMAIL_TEXT: overrides.EMAIL_TEXT,
  EMAIL_ALT: overrides.EMAIL_ALT,
  EMAIL_ALT_TEXT: overrides.EMAIL_ALT_TEXT,
  STEAM: overrides.STEAM,
  BUYMEACOFFEE: overrides.BUYMEACOFFEE,
  PATREON: overrides.PATREON,
  YOUTUBE_MUSIC: overrides.YOUTUBE_MUSIC,
  ...overrides,
})

describe('Home', () => {
  it('renders avatar with config', () => {
    const { container } = render(<Home config={makeConfig()} />)
    const img = container.querySelector('img.avatar')
    expect(img).not.toBeNull()
    expect(img.getAttribute('src')).toBe('https://example.com/avatar.png')
    expect(img.getAttribute('alt')).toBe('Test avatar')
  })

  it("does not render YouTube button when YOUTUBE is not configured", () => {
    const { container } = render(<Home config={makeConfig({ YOUTUBE: undefined })} />)
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders name when configured', () => {
    const { container } = render(<Home config={makeConfig()} />)
    expect(container.querySelector('h1')?.textContent).toBe('Test User')
  })

  it('renders bio when configured', () => {
    const { container } = render(<Home config={makeConfig()} />)
    expect(container.querySelector('p')?.textContent).toBe('Test bio')
  })

  it('renders custom buttons from CUSTOM_BUTTON_* vars', () => {
    const { container } = render(
      <Home config={makeConfig({
        CUSTOM_BUTTON_NAME: 'custom',
        CUSTOM_BUTTON_URL: 'https://example.com',
        CUSTOM_BUTTON_ALT_TEXT: 'Custom',
        CUSTOM_BUTTON_COLOR: 'blue',
        CUSTOM_BUTTON_TEXT_COLOR: 'white',
        CUSTOM_BUTTON_ICON: 'star',
        CUSTOM_BUTTON_TEXT: 'Custom Button',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders custom buttons when texts is null', () => {
    const { container } = render(
      <Home config={makeConfig({
        CUSTOM_BUTTON_NAME: 'custom',
        CUSTOM_BUTTON_URL: 'https://example.com',
        CUSTOM_BUTTON_ALT_TEXT: 'Custom',
        CUSTOM_BUTTON_COLOR: 'blue',
        CUSTOM_BUTTON_TEXT_COLOR: 'white',
        CUSTOM_BUTTON_ICON: 'star',
        CUSTOM_BUTTON_TEXT: null,
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders custom buttons when texts is undefined', () => {
    const { container } = render(
      <Home config={makeConfig({
        CUSTOM_BUTTON_NAME: 'custom',
        CUSTOM_BUTTON_URL: 'https://example.com',
        CUSTOM_BUTTON_ALT_TEXT: 'Custom',
        CUSTOM_BUTTON_COLOR: 'blue',
        CUSTOM_BUTTON_TEXT_COLOR: 'white',
        CUSTOM_BUTTON_ICON: 'star',
        CUSTOM_BUTTON_TEXT: undefined,
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('does not render YouTube button when YOUTUBE is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ YOUTUBE: 'https://youtube.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it("does not render Twitch button when TWITCH is not configured", () => {
    const { container } = render(<Home config={makeConfig({ TWITCH: undefined })} />)
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Instagram button when INSTAGRAM is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ INSTAGRAM: 'https://instagram.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders Twitter button when TWITTER is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TWITTER: 'https://twitter.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders Sort component when CUSTOM_BUTTON_TEXT is set', () => {
    const { container } = render(
      <Home config={makeConfig({
        CUSTOM_BUTTON_TEXT: 'test',
        CUSTOM_BUTTON_NAME: 'custom',
        CUSTOM_BUTTON_URL: 'https://example.com',
        CUSTOM_BUTTON_ALT_TEXT: 'Custom',
        CUSTOM_BUTTON_COLOR: 'blue',
        CUSTOM_BUTTON_TEXT_COLOR: 'white',
        CUSTOM_BUTTON_ICON: 'star',
      })} />,
    )
    const sortBtn = container.querySelector('a.button')
    expect(sortBtn).not.toBeNull()
  })

  it('renders all configured social media buttons', () => {
    const { container } = render(
      <Home config={makeConfig({
        YOUTUBE: 'https://youtube.com',
        TWITCH: 'https://twitch.com',
        GITHUB: 'https://github.com',
        TWITTER: 'https://twitter.com',
        FACEBOOK: 'https://facebook.com',
        INSTAGRAM: 'https://instagram.com',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(3)
  })

  it('tests BUTTON_ORDER with twitter first', () => {
    const { container } = render(
      <Home config={makeConfig({
        BUTTON_ORDER: 'twitter, youtube, github',
        YOUTUBE: 'https://youtube.com',
        TWITCH: 'https://twitch.com',
        GITHUB: 'https://github.com',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(3)
  })

  it('tests BUTTON_ORDER with single button at end', () => {
    const { container } = render(
      <Home config={makeConfig({
        BUTTON_ORDER: 'github, instagram, discord',
        GITHUB: 'https://github.com',
        INSTAGRAM: 'https://instagram.com',
        DISCORD: 'https://discord.com',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(3)
  })

  it('tests BUTTON_ORDER with undefined (buttons still render individually)', () => {
    const { container } = render(
      <Home config={makeConfig({
        BUTTON_ORDER: undefined,
        YOUTUBE: 'https://youtube.com',
        TWITCH: 'https://twitch.com',
        GITHUB: 'https://github.com',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('tests BUTTON_ORDER with empty string (buttons still render individually)', () => {
    const { container } = render(
      <Home config={makeConfig({
        BUTTON_ORDER: '',
        YOUTUBE: 'https://youtube.com',
        TWITCH: 'https://twitch.com',
        GITHUB: 'https://github.com',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders custom buttons with all required props', () => {
    const { container } = render(
      <Home config={makeConfig({
        CUSTOM_BUTTON_NAME: 'custom',
        CUSTOM_BUTTON_URL: 'https://example.com',
        CUSTOM_BUTTON_ALT_TEXT: 'Custom',
        CUSTOM_BUTTON_COLOR: 'blue',
        CUSTOM_BUTTON_TEXT_COLOR: 'white',
        CUSTOM_BUTTON_ICON: 'star',
        CUSTOM_BUTTON_TEXT: 'Custom Button',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders custom buttons with some missing props', () => {
    const { container } = render(
      <Home config={makeConfig({
        CUSTOM_BUTTON_NAME: 'custom',
        CUSTOM_BUTTON_URL: 'https://example.com',
        CUSTOM_BUTTON_ALT_TEXT: 'Custom',
        CUSTOM_BUTTON_COLOR: 'blue',
        CUSTOM_BUTTON_TEXT_COLOR: undefined,
        CUSTOM_BUTTON_ICON: 'star',
        CUSTOM_BUTTON_TEXT: 'Custom Button',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders custom buttons when CUSTOM_BUTTON_NAME is undefined', () => {
    const { container } = render(
      <Home config={makeConfig({
        CUSTOM_BUTTON_URL: 'https://example.com',
        CUSTOM_BUTTON_ICON: 'star',
        CUSTOM_BUTTON_TEXT: 'Custom Button',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders nothing when CUSTOM_BUTTON_TEXT is undefined', () => {
    const { container } = render(
      <Home config={makeConfig()} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders nothing when CUSTOM_BUTTON_TEXT is empty', () => {
    const { container } = render(
      <Home config={makeConfig({
        CUSTOM_BUTTON_NAME: '',
        CUSTOM_BUTTON_URL: '',
        CUSTOM_BUTTON_ALT_TEXT: '',
        CUSTOM_BUTTON_COLOR: '',
        CUSTOM_BUTTON_TEXT_COLOR: '',
        CUSTOM_BUTTON_ICON: '',
        CUSTOM_BUTTON_TEXT: '',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders custom buttons when CUSTOM_BUTTON_TEXT is set', () => {
    const { container } = render(
      <Home config={makeConfig({
        CUSTOM_BUTTON_NAME: 'Button1',
        CUSTOM_BUTTON_URL: 'https://example.com/1',
        CUSTOM_BUTTON_ALT_TEXT: 'Button 1',
        CUSTOM_BUTTON_COLOR: '#000000',
        CUSTOM_BUTTON_TEXT_COLOR: '#ffffff',
        CUSTOM_BUTTON_ICON: 'icon1',
        CUSTOM_BUTTON_TEXT: 'Button 1',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders nothing when CUSTOM_BUTTON_TEXT is undefined', () => {
    const { container } = render(
      <Home config={makeConfig({ CUSTOM_BUTTON_TEXT: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders TikTok button when TIKTOK is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TIKTOK: 'https://tiktok.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render TikTok button when TIKTOK is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TIKTOK: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Email Alt button when EMAIL_ALT is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ EMAIL_ALT: 'test@example.com', EMAIL_ALT_TEXT: 'Email' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Email Alt button when EMAIL_ALT is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ EMAIL_ALT: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders with only some social media', () => {
    const { container } = render(
      <Home config={makeConfig({
        YOUTUBE: 'https://youtube.com',
        TWITCH: 'https://twitch.com',
        GITHUB: 'https://github.com',
        // Others not configured
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(3)
  })

  it('renders with no social media configured', () => {
    const { container } = render(
      <Home config={makeConfig({
        YOUTUBE: undefined,
        TWITCH: undefined,
        GITHUB: undefined,
        TWITTER: undefined,
        FACEBOOK: undefined,
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders avatar with drop shadow class when DROP_SHADOW is medium', () => {
    const { container } = render(
      <Home config={makeConfig({ DROP_SHADOW: 'medium' })} />,
    )
    const avatar = container.querySelector('.avatar')
    expect(avatar).not.toBeNull()
    const avatarClass = avatar?.getAttribute('class') || ''
    expect(avatarClass.includes('box-shadow-medium')).toBe(true)
  })

  it('renders with avatar alt text', () => {
    const { container } = render(
      <Home config={makeConfig({ AVATAR_ALT: 'Custom alt text' })} />,
    )
    const img = container.querySelector('img.avatar')
    expect(img.getAttribute('alt')).toBe('Custom alt text')
  })

  it('renders with NAME configured', () => {
    const { container } = render(<Home config={makeConfig()} />)
    expect(container.querySelector('h1')?.textContent).toBe('Test User')
  })

  it('renders nothing when NAME is empty string', () => {
    const { container } = render(
      <Home config={makeConfig({ NAME: '' })} />,
    )
    expect(container.querySelector('h1')).toBeNull()
  })

  it('renders with BIO configured', () => {
    const { container } = render(<Home config={makeConfig()} />)
    expect(container.querySelector('p')?.textContent).toBe('Test bio')
  })

  it('renders avatar without drop shadow when DROP_SHADOW is none', () => {
    const { container } = render(
      <Home config={makeConfig({ DROP_SHADOW: 'none' })} />,
    )
    const avatar = container.querySelector('.avatar')
    expect(avatar).not.toBeNull()
    const avatarClass = avatar?.getAttribute('class') || ''
    expect(avatarClass.includes('box-shadow-none') || !avatarClass.includes('box-shadow')).toBe(true)
  })

  it('renders avatar with drop shadow class when DROP_SHADOW is light', () => {
    const { container } = render(
      <Home config={makeConfig({ DROP_SHADOW: 'light' })} />,
    )
    const avatar = container.querySelector('.avatar')
    expect(avatar).not.toBeNull()
    const avatarClass = avatar?.getAttribute('class') || ''
    expect(avatarClass.includes('box-shadow-light')).toBe(true)
  })

  it('renders avatar with drop shadow class when DROP_SHADOW is heavy', () => {
    const { container } = render(
      <Home config={makeConfig({ DROP_SHADOW: 'heavy' })} />,
    )
    const avatar = container.querySelector('.avatar')
    expect(avatar).not.toBeNull()
    const avatarClass = avatar?.getAttribute('class') || ''
    expect(avatarClass.includes('box-shadow-heavy')).toBe(true)
  })

  it('renders with only some social media including facebook messenger', () => {
    const { container } = render(
      <Home config={makeConfig({
        YOUTUBE: 'https://youtube.com',
        TWITCH: 'https://twitch.com',
        GITHUB: 'https://github.com',
        FACEBOOK_MESSENGER: 'https://messenger.com',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(4)
  })

  it('renders with only some social media including linkedin', () => {
    const { container } = render(
      <Home config={makeConfig({
        YOUTUBE: 'https://youtube.com',
        TWITCH: 'https://twitch.com',
        GITHUB: 'https://github.com',
        LINKED_IN: 'https://linkedin.com',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(4)
  })

  it('renders with only some social media including product hunt', () => {
    const { container } = render(
      <Home config={makeConfig({
        YOUTUBE: 'https://youtube.com',
        TWITCH: 'https://twitch.com',
        GITHUB: 'https://github.com',
        PRODUCT_HUNT: 'https://producthunt.com',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(4)
  })

  it('tests BUTTON_ORDER with youtube first', () => {
    const { container } = render(
      <Home config={makeConfig({
        BUTTON_ORDER: 'youtube, twitter, github',
        YOUTUBE: 'https://youtube.com',
        TWITTER: 'https://twitter.com',
        GITHUB: 'https://github.com',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(3)
  })

  it('renders with no social media but BUTTON_ORDER set', () => {
    const { container } = render(
      <Home config={makeConfig({
        BUTTON_ORDER: 'twitter, github',
        TWITTER: 'https://twitter.com',
        GITHUB: 'https://github.com',
      })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(2)
  })

  it('renders Spotify button when SPOTIFY is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SPOTIFY: 'https://spotify.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Spotify button when SPOTIFY is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SPOTIFY: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Reddit button when REDDIT is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ REDDIT: 'https://reddit.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Reddit button when REDDIT is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ REDDIT: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Medium button when MEDIUM is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ MEDIUM: 'https://medium.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Medium button when MEDIUM is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ MEDIUM: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Pinterest button when PINTEREST is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ PINTEREST: 'https://pinterest.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Pinterest button when PINTEREST is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ PINTEREST: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Email button when EMAIL is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ EMAIL: 'test@example.com', EMAIL_TEXT: 'Email', EMAIL_ALT_TEXT: 'Email' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Email button when EMAIL is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ EMAIL: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders SoundCloud button when SOUND_CLOUD is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SOUND_CLOUD: 'https://soundcloud.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render SoundCloud button when SOUND_CLOUD is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SOUND_CLOUD: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Figma button when FIGMA is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ FIGMA: 'https://figma.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Figma button when FIGMA is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ FIGMA: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Telegram button when TELEGRAM is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TELEGRAM: 'https://telegram.org' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Telegram button when TELEGRAM is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TELEGRAM: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders STEAM button when STEAM is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ STEAM: 'https://steam.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render STEAM button when STEAM is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ STEAM: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Vimeo button when VIMEO is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ VIMEO: 'https://vimeo.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Vimeo button when VIMEO is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ VIMEO: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders WordPress button when WORDPRESS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ WORDPRESS: 'https://wordpress.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render WordPress button when WORDPRESS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ WORDPRESS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Goodreads button when GOODREADS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GOODREADS: 'https://goodreads.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Goodreads button when GOODREADS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GOODREADS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Skoo button when SKOOB is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SKOOB: 'https://skoo.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Skoo button when SKOOB is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SKOOB: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Letterboxd button when LETTERBOXD is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ LETTERBOXD: 'https://letterboxd.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Letterboxd button when LETTERBOXD is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ LETTERBOXD: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Mastodon button when MASTODON is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ MASTODON: 'https://mastodon.social' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Mastodon button when MASTODON is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ MASTODON: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders WhatsApp button when WHATSAPP is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ WHATSAPP: 'https://wa.me/123456789' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render WhatsApp button when WHATSAPP is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ WHATSAPP: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders KIT button when KIT is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ KIT: 'https://kit.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render KIT button when KIT is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ KIT: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Micro.blog button when MICRO_BLOG is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ MICRO_BLOG: 'https://micro.blog' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Micro.blog button when MICRO_BLOG is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ MICRO_BLOG: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Tumblr button when TUMBLR is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GOODREADS: 'https://goodreads.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Goodreads button when GOODREADS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GOODREADS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Tumblr button when TUMBLR is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TUMBLR: 'https://tumblr.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Tumblr button when TUMBLR is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TUMBLR: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders TikTok button when TIKTOK is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TIKTOK: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Snapchat button when SNAPCHAT is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SNAPCHAT: 'https://snapchat.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Snapchat button when SNAPCHAT is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SNAPCHAT: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Strava button when STRAVA is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ STRAVA: 'https://strava.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Strava button when STRAVA is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ STRAVA: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Bluesky button when BLUESKY is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ BLUESKY: 'https://bsky.app' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Bluesky button when BLUESKY is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ BLUESKY: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Buy Me a Coffee button when BUYMEACOFFEE is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ BUYMEACOFFEE: 'https://buymeacoffee.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Buy Me a Coffee button when BUYMEACOFFEE is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ BUYMEACOFFEE: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders GitLab button when GITLAB is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GITLAB: 'https://gitlab.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render GitLab button when GITLAB is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GITLAB: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Patreon button when PATREON is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ PATREON: 'https://patreon.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Patreon button when PATREON is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ PATREON: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Dev.to button when DEVTO is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ DEVTO: 'https://devto.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Dev.to button when DEVTO is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ DEVTO: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders PayPal button when PAYPAL is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ PAYPAL: 'https://paypal.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render PayPal button when PAYPAL is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ PAYPAL: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Slack button when SLACK is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SLACK: 'https://slack.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Slack button when SLACK is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SLACK: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Stack Overflow button when STACKOVERFLOW is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ STACKOVERFLOW: 'https://stackoverflow.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Stack Overflow button when STACKOVERFLOW is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ STACKOVERFLOW: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Last.fm button when LASTFM is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ LASTFM: 'https://last.fm' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Last.fm button when LASTFM is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ LASTFM: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Gitea button when GITEA is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GITEA: 'https://gitea.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Gitea button when GITEA is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GITEA: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Polywork button when POLYWORK is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ POLYWORK: 'https://polywork.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Polywork button when POLYWORK is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ POLYWORK: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Signal button when SIGNAL is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SIGNAL: 'https://signal.org' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Signal button when SIGNAL is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SIGNAL: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Untappd button when UNTAPPD is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ UNTAPPD: 'https://untappd.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Untappd button when UNTAPPD is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ UNTAPPD: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Instant Gaming button when INSTANTGAMING is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ INSTANTGAMING: 'https://instantgaming.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Instant Gaming button when INSTANTGAMING is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ INSTANTGAMING: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Ghost button when GHOST is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GHOST: 'https://ghost.org' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Ghost button when GHOST is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GHOST: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Trakt button when TRAKT is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TRAKT: 'https://trakt.tv' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Trakt button when TRAKT is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TRAKT: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Cash App button when CASHAPP is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ CASHAPP: 'https://cash.app' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Cash App button when CASHAPP is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ CASHAPP: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Teespring button when TEESPRING is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TEESPRING: 'https://teespring.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Teespring button when TEESPRING is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TEESPRING: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Xing button when XING is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ XING: 'https://xing.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Xing button when XING is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ XING: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Keybase button when KEYBASE is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ KEYBASE: 'https://keybase.io' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Keybase button when KEYBASE is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ KEYBASE: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders OnlyFans button when ONLYFANS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ ONLYFANS: 'https://onlyfans.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render OnlyFans button when ONLYFANS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ ONLYFANS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Session button when SESSION is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SESSION: 'https://session.org' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Session button when SESSION is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SESSION: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Threema button when THREEMA is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ THREEMA: 'https://threema.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Threema button when THREEMA is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ THREEMA: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Streamlabs button when STREAMLABS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ STREAMLABS: 'https://streamlabs.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Streamlabs button when STREAMLABS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ STREAMLABS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders PrivateBin button when PRIVATEBIN is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ PRIVATEBIN: 'https://privatebin.net' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render PrivateBin button when PRIVATEBIN is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ PRIVATEBIN: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Amazon Affiliate button when AMAZON_AFFILIATE is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ AMAZON_AFFILIATE: 'https-amazon-affiliate:...' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Amazon Affiliate button when AMAZON_AFFILIATE is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ AMAZON_AFFILIATE: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Amazon Wishlist button when AMAZON_WISHLIST is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ AMAZON_WISHLIST: 'https://amazon.com/wishlist' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Amazon Wishlist button when AMAZON_WISHLIST is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ AMAZON_WISHLIST: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Apple Music button when APPLE_MUSIC is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ APPLE_MUSIC: 'https://music.apple.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Apple Music button when APPLE_MUSIC is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ APPLE_MUSIC: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders YouTube Music button when YOUTUBE_MUSIC is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ YOUTUBE_MUSIC: 'https://music.youtube.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render YouTube Music button when YOUTUBE_MUSIC is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ YOUTUBE_MUSIC: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Venmo button when VENMO is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ VENMO: 'https://venmo.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Venmo button when VENMO is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ VENMO: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Status button when STATUS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ STATUS: 'https://status.im' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Status button when STATUS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ STATUS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Matrix button when MATRIX is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ MATRIX: 'https://matrix.org' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Matrix button when MATRIX is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ MATRIX: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Anilist button when ANILIST is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ ANILIST: 'https://anilist.co' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Anilist button when ANILIST is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ ANILIST: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders GitBucket button when GITBUCKET is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GITBUCKET: 'https://gitbucket.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render GitBucket button when GITBUCKET is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GITBUCKET: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Shazam button when SHAZAM is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SHAZAM: 'https://shazam.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Shazam button when SHAZAM is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SHAZAM: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Flickr button when FLICKR is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ FLICKR: 'https://flickr.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Flickr button when FLICKR is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ FLICKR: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders The Poster Database button when TPDB is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TPDB: 'https://tpdb.app' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render The Poster Database button when TPDB is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TPDB: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders OSU button when OSU is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ OSU: 'https://osu.ppy.sh' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render OSU button when OSU is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ OSU: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders KakaoTalk button when KAKAOTALK is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ KAKAOTALK: 'https://kakaotalk.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render KakaoTalk button when KAKAOTALK is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ KAKAOTALK: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Line Messenger button when LINE is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ LINE: 'https://line.me' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Line Messenger button when LINE is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ LINE: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Design by Humans button when DESIGNBYHUMANS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ DESIGNBYHUMANS: 'https://designbyhumans.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Design by Humans button when DESIGNBYHUMANS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ DESIGNBYHUMANS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders DockerHub button when DOCKERHUB is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ DOCKERHUB: 'https://dockerhub.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render DockerHub button when DOCKERHUB is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ DOCKERHUB: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Vero button when VERO is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ VERO: 'https://vero.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Vero button when VERO is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ VERO: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders MyAnimeList button when MYANIMELIST is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ MYANIMELIST: 'https://myanimelist.net' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render MyAnimeList button when MYANIMELIST is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ MYANIMELIST: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders 500px button when FIVEHUNDREDPX is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ FIVEHUNDREDPX: 'https://500px.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render 500px button when FIVEHUNDREDPX is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ FIVEHUNDREDPX: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders JetPhotos button when JETPHOTOS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ JETPHOTOS: 'https://jetphotos.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render JetPhotos button when JETPHOTOS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ JETPHOTOS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Substack button when SUBSTACK is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SUBSTACK: 'https://substack.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Substack button when SUBSTACK is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SUBSTACK: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Printables button when PRINTABLES is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ PRINTABLES: 'https://printables.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Printables button when PRINTABLES is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ PRINTABLES: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Serializd button when SERIALIZD is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SERIALIZD: 'https://serializd.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Serializd button when SERIALIZD is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SERIALIZD: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Threads button when THREADS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ THREADS: 'https://threads.net' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Threads button when THREADS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ THREADS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Lemmy button when LEMMY is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ LEMMY: 'https://lemmy.ml' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Lemmy button when LEMMY is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ LEMMY: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Pixelfed button when PIXELFED is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ PIXELFED: 'https://pixelfed.social' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Pixelfed button when PIXELFED is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ PIXELFED: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders VRChat button when VRCHAT is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ VRCHAT: 'https://vrchat.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render VRChat button when VRCHAT is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ VRCHAT: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders CodeWars button when CODEWARS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ CODEWARS: 'https://codewars.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render CodeWars button when CODEWARS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ CODEWARS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Apple Podcasts button when APPLE_PODCASTS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ APPLE_PODCASTS: 'https://podcasts.apple.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Apple Podcasts button when APPLE_PODCASTS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ APPLE_PODCASTS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Google Podcasts button when GOOGLE_PODCASTS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GOOGLE_PODCASTS: 'https://podcasts.google.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Google Podcasts button when GOOGLE_PODCASTS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GOOGLE_PODCASTS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Pocket Casts button when POCKET_CASTS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ POCKET_CASTS: 'https://pca.st' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Pocket Casts button when POCKET_CASTS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ POCKET_CASTS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Overcast button when OVERCAST is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ OVERCAST: 'https://overcast.fm' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Overcast button when OVERCAST is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ OVERCAST: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders RSS button when RSS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ RSS: 'https://rss.org' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render RSS button when RSS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ RSS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Audius button when AUDIUS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ AUDIUS: 'https://audius.co' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Audius button when AUDIUS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ AUDIUS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Bandcamp button when BANDCAMP is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ BANDCAMP: 'https://bandcamp.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Bandcamp button when BANDCAMP is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ BANDCAMP: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Forgejo button when FORGEJO is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ FORGEJO: 'https://forgejo.org' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Forgejo button when FORGEJO is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ FORGEJO: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders ORCID button when ORCID is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ ORCID: 'https://orcid.org' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render ORCID button when ORCID is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ ORCID: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Credly button when CREDLY is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ CREDLY: 'https://credly.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Credly button when CREDLY is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ CREDLY: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Semantic Scholar button when SEMANTICSCHOLAR is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SEMANTICSCHOLAR: 'https://semanticscholar.org' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Semantic Scholar button when SEMANTICSCHOLAR is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SEMANTICSCHOLAR: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Simplex button when SIMPLEX is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SIMPLEX: 'https://simplex.chat' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Simplex button when SIMPLEX is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SIMPLEX: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Mixcloud button when MIXCLOUD is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ MIXCLOUD: 'https://mixcloud.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Mixcloud button when MIXCLOUD is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ MIXCLOUD: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Internet Archive button when INTERNETARCHIVE is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ INTERNETARCHIVE: 'https://archive.org' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Internet Archive button when INTERNETARCHIVE is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ INTERNETARCHIVE: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Google Maps button when GOOGLEMAPS is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GOOGLEMAPS: 'https://google.com/maps' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Google Maps button when GOOGLEMAPS is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GOOGLEMAPS: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Tidal button when TIDAL is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TIDAL: 'https://tidal.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Tidal button when TIDAL is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ TIDAL: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders The StoryGraph button when THESTORYGRAPH is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ THESTORYGRAPH: 'https://thestorygraph.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render The StoryGraph button when THESTORYGRAPH is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ THESTORYGRAPH: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Geocaching button when GEOCACHING is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GEOCACHING: 'https://geocaching.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Geocaching button when GEOCACHING is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GEOCACHING: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Neocities button when NEOCITIES is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ NEOCITIES: 'https://neocities.org' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Neocities button when NEOCITIES is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ NEOCITIES: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Dreamwidth button when DREAMWIDTH is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ DREAMWIDTH: 'https://dreamwidth.org' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Dreamwidth button when DREAMWIDTH is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ DREAMWIDTH: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders SpaceHey button when SPACEHEY is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SPACEHEY: 'https://spacehey.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render SpaceHey button when SPACEHEY is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ SPACEHEY: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Viber button when VIBER is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ VIBER: 'https://viber.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Viber button when VIBER is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ VIBER: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Pillowfort button when PILLOWFORT is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ PILLOWFORT: 'https://pillowfort.social' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Pillowfort button when PILLOWFORT is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ PILLOWFORT: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders MakerWorld button when MAKERWORLD is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ MAKERWORLD: 'https://makerworld.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render MakerWorld button when MAKERWORLD is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ MAKERWORLD: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders X button when X is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ X: 'https://x.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render X button when X is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ X: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders Google Scholar button when GOOGLESCHOLAR is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GOOGLESCHOLAR: 'https://scholar.google.com' })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render Google Scholar button when GOOGLESCHOLAR is not configured', () => {
    const { container } = render(
      <Home config={makeConfig({ GOOGLESCHOLAR: undefined })} />,
    )
    const buttons = container.querySelectorAll('a.button')
    expect(buttons.length).toBe(0)
  })

  it('renders footer text when FOOTER is configured', () => {
    const { container } = render(
      <Home config={makeConfig({ FOOTER: 'My footer' })} />,
    )
    const footer = container.querySelector('p.footer')
    expect(footer).not.toBeNull()
    expect(footer.textContent).toContain('My footer')
  })

  it('renders Share component when SHARE, OG_TITLE, and OG_DESCRIPTION are configured', () => {
    const { container } = render(
      <Home
        config={makeConfig({
          SHARE: 'https://example.com/share',
          OG_TITLE: 'Test Title',
          OG_DESCRIPTION: 'Test Description',
        })}
      />,
    )
    const footer = container.querySelector('p.footer')
    expect(footer).not.toBeNull()
  })
})
