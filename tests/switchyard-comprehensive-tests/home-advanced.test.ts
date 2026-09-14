import { test } from 'node:test';
import assert from 'node:assert';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import Home from '../../src/components/Home/Home';
import { ENV_NAMES } from '../../src/config/envNames';

type Config = Record<(typeof ENV_NAMES)[number], string | undefined>;

const baseConfig: Config = Object.fromEntries(ENV_NAMES.map((k) => [k, undefined])) as Config;
Object.assign(baseConfig, {
  AVATAR_URL: 'https://example.com/avatar.jpg',
  AVATAR_2X_URL: 'https://example.com/avatar2x.jpg',
  AVATAR_ALT: 'Test avatar',
  AVATAR_SIZE: 'medium',
  DROP_SHADOW: 'medium',
});

const makeConfig = (keys: Partial<Config>) => ({
  ...baseConfig,
  ...keys,
});

test('renders Home component with empty config', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: {} }));
  assert.ok(typeof html === 'string');
});

test('renders NAME when config.NAME is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, NAME: 'Test User' } }));
  assert.ok(html.includes('Test User'));
});

test('does not render NAME when config.NAME is undefined', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: baseConfig }));
  assert.ok(!html.includes('Test User'));
});

test('renders BIO when config.BIO is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, BIO: 'Bio text' } }));
  assert.ok(html.includes('Bio text'));
});

test('does not render BIO when config.BIO is undefined', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: baseConfig }));
  assert.ok(!html.includes('Bio text'));
});

test('renders Avatar with URL', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: baseConfig }));
  assert.ok(html.includes('avatar.jpg'));
});

test('renders Avatar with 2X URL srcSet', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: baseConfig }));
  assert.ok(html.includes('avatar2x.jpg'));
});

test('renders Avatar with alt text', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, AVATAR_ALT: 'Alt text' } }));
  assert.ok(html.includes('Alt text'));
});

test('renders Avatar with size style', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, AVATAR_SIZE: 'large' } }));
  assert.ok(html.includes('width:large') || html.includes('width: large'));
});

test('renders YouTube button when YOUTUBE is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, YOUTUBE: 'https://youtube.com' } }));
  assert.ok(html.includes('youtube'));
});

test('does not render YouTube button when YOUTUBE is undefined', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: baseConfig }));
  assert.ok(!html.includes('youtube'));
});

test('renders Twitch button when TWITCH is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, TWITCH: 'https://twitch.com' } }));
  assert.ok(html.includes('twitch'));
});

test('does not render Twitch button when TWITCH is undefined', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: baseConfig }));
  assert.ok(!html.includes('twitch'));
});

test('renders Twitter button when TWITTER is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, TWITTER: 'https://twitter.com' } }));
  assert.ok(html.includes('twitter'));
});

test('renders GitHub button when GITHUB is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, GITHUB: 'https://github.com' } }));
  assert.ok(html.includes('github'));
});

test('renders Discord button when DISCORD is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, DISCORD: 'https://discord.com' } }));
  assert.ok(html.includes('discord'));
});

test('renders Instagram button when INSTAGRAM is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, INSTAGRAM: 'https://instagram.com' } }));
  assert.ok(html.includes('instagram'));
});

test('renders TikTok button when TIKTOK is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, TIKTOK: 'https://tiktok.com' } }));
  assert.ok(html.includes('tiktok'));
});

test('renders Facebook button when FACEBOOK is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, FACEBOOK: 'https://facebook.com' } }));
  assert.ok(html.includes('facebook'));
});

test('renders Facebook Messenger button when FACEBOOK_MESSENGER is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, FACEBOOK_MESSENGER: 'https://messenger.com' } }));
  assert.ok(html.includes('messenger'));
});

test('renders LinkedIn button when LINKED_IN is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, LINKED_IN: 'https://linkedin.com' } }));
  assert.ok(html.includes('linkedin'));
});

test('renders Product Hunt button when PRODUCT_HUNT is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, PRODUCT_HUNT: 'https://producthunt.com' } }));
  assert.ok(html.includes('producthunt'));
});

test('renders Snapchat button when SNAPCHAT is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, SNAPCHAT: 'https://snapchat.com' } }));
  assert.ok(html.includes('snapchat'));
});

test('renders Spotify button when SPOTIFY is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, SPOTIFY: 'https://spotify.com' } }));
  assert.ok(html.includes('spotify'));
});

test('renders Reddit button when REDDIT is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, REDDIT: 'https://reddit.com' } }));
  assert.ok(html.includes('reddit'));
});

test('renders Medium button when MEDIUM is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, MEDIUM: 'https://medium.com' } }));
  assert.ok(html.includes('medium'));
});

test('renders Pinterest button when PINTEREST is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, PINTEREST: 'https://pinterest.com' } }));
  assert.ok(html.includes('pinterest'));
});

test('renders email mailto button when EMAIL is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, EMAIL: 'test@example.com' } }));
  assert.ok(html.includes('mailto:'));
});

test('renders email alt text when EMAIL_ALT is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, EMAIL_ALT: 'Email alt' } }));
  assert.ok(html.includes('Email alt'));
});

test('renders SoundCloud button when SOUND_CLOUD is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, SOUND_CLOUD: 'https://soundcloud.com' } }));
  assert.ok(html.includes('soundcloud'));
});

test('renders Figma button when FIGMA is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, FIGMA: 'https://figma.com' } }));
  assert.ok(html.includes('figma'));
});

test('renders Skoob button when SKOOB is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, SKOOB: 'https://skoob.com' } }));
  assert.ok(html.includes('skoob'));
});

test('renders Steam button when STEAM is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, STEAM: 'https://steam.com' } }));
  assert.ok(html.includes('steam'));
});

test('renders Vimeo button when VIMEO is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, VIMEO: 'https://vimeo.com' } }));
  assert.ok(html.includes('vimeo'));
});

test('renders WordPress button when WORDPRESS is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, WORDPRESS: 'https://wordpress.com' } }));
  assert.ok(html.includes('wordpress'));
});

test('renders Tumblr button when TUMBLR is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, TUMBLR: 'https://tumblr.com' } }));
  assert.ok(html.includes('tumblr'));
});

test('renders Telegram button when TELEGRAM is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, TELEGRAM: 'https://telegram.org' } }));
  assert.ok(html.includes('telegram'));
});

test('applies dropShadow to Avatar', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: baseConfig }));
  assert.ok(html.includes('box-shadow-medium'));
});

test('renders custom button container when CUSTOM_BUTTON_TEXT is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, CUSTOM_BUTTON_TEXT: 'Custom' } }));
  assert.ok(html.includes('data-order'));
});

test('renders BUTTON_ORDER links', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, BUTTON_ORDER: 'twitter,github,facebook', TWITTER: 'https://twitter.com', GITHUB: 'https://github.com', FACEBOOK: 'https://facebook.com' } }));
  assert.ok(html.includes('twitter'));
  assert.ok(html.includes('github'));
  assert.ok(html.includes('facebook'));
});

test('renders email with custom text when EMAIL and EMAIL_TEXT are set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { ...baseConfig, EMAIL: 'test@example.com', EMAIL_TEXT: 'Contact us' } }));
  assert.ok(html.includes('Contact us'));
});

test('renders custom buttons with all props', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: {
    ...baseConfig,
    CUSTOM_BUTTON_NAME: 'twitter,github',
    CUSTOM_BUTTON_URL: 'https://twitter.com,https://github.com',
    CUSTOM_BUTTON_ALT_TEXT: 'Twitter,GitHub',
    CUSTOM_BUTTON_TEXT: 'Click Me,Click Me 2',
    CUSTOM_BUTTON_COLOR: 'blue,green',
    CUSTOM_BUTTON_TEXT_COLOR: 'white,black',
    CUSTOM_BUTTON_ICON: 'bird,octocat',
  } }));
  assert.ok(html.includes('twitter') && html.includes('github'));
});
