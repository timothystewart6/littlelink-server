import { test } from 'node:test';
import assert from 'node:assert';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import Home from '../../src/components/Home/Home';

test('renders youtube button when config.YOUTUBE is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { YOUTUBE: 'https://youtube.com' } }));
  assert.ok(html.includes('youtube'), 'youtube button should be rendered');
});

test('renders twitch button when config.TWITCH is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { TWITCH: 'https://twitch.com' } }));
  assert.ok(html.includes('twitch'), 'twitch button should be rendered');
});

test('renders twitter button when config.TWITTER is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { TWITTER: 'https://twitter.com' } }));
  assert.ok(html.includes('twitter'), 'twitter button should be rendered');
});

test('renders instagram button when config.INSTAGRAM is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { INSTAGRAM: 'https://instagram.com' } }));
  assert.ok(html.includes('instagram'), 'instagram button should be rendered');
});

test('renders github button when config.GITHUB is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { GITHUB: 'https://github.com' } }));
  assert.ok(html.includes('github'), 'github button should be rendered');
});

test('renders discord button when config.DISCORD is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { DISCORD: 'https://discord.com' } }));
  assert.ok(html.includes('discord'), 'discord button should be rendered');
});

test('renders tiktok button when config.TIKTOK is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { TIKTOK: 'https://tiktok.com' } }));
  assert.ok(html.includes('tiktok'), 'tiktok button should be rendered');
});

test('renders facebook button when config.FACEBOOK is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { FACEBOOK: 'https://facebook.com' } }));
  assert.ok(html.includes('facebook'), 'facebook button should be rendered');
});

test('renders facebookmessenger button when config.FACEBOOK_MESSENGER is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { FACEBOOK_MESSENGER: 'https://messenger.com' } }));
  assert.ok(html.includes('facebookmessenger'), 'facebookmessenger button should be rendered');
});

test('renders linkedin button when config.LINKED_IN is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { LINKED_IN: 'https://linkedin.com' } }));
  assert.ok(html.includes('linkedin'), 'linkedin button should be rendered');
});

test('renders producthunt button when config.PRODUCT_HUNT is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { PRODUCT_HUNT: 'https://producthunt.com' } }));
  assert.ok(html.includes('producthunt'), 'producthunt button should be rendered');
});

test('renders snapchat button when config.SNAPCHAT is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { SNAPCHAT: 'https://snapchat.com' } }));
  assert.ok(html.includes('snapchat'), 'snapchat button should be rendered');
});

test('renders spotify button when config.SPOTIFY is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { SPOTIFY: 'https://spotify.com' } }));
  assert.ok(html.includes('spotify'), 'spotify button should be rendered');
});

test('renders reddit button when config.REDDIT is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { REDDIT: 'https://reddit.com' } }));
  assert.ok(html.includes('reddit'), 'reddit button should be rendered');
});

test('renders medium button when config.MEDIUM is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { MEDIUM: 'https://medium.com' } }));
  assert.ok(html.includes('medium'), 'medium button should be rendered');
});

test('renders pinterest button when config.PINTEREST is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { PINTEREST: 'https://pinterest.com' } }));
  assert.ok(html.includes('pinterest'), 'pinterest button should be rendered');
});

test('renders email button when config.EMAIL is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { EMAIL: 'test@example.com' } }));
  assert.ok(html.includes('email'), 'email button should be rendered');
});

test('renders email_alt button when config.EMAIL_ALT is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { EMAIL_ALT: 'alt@example.com' } }));
  assert.ok(html.includes('email_alt'), 'email_alt button should be rendered');
});

test('renders soundcloud button when config.SOUND_CLOUD is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { SOUND_CLOUD: 'https://soundcloud.com' } }));
  assert.ok(html.includes('soundcloud'), 'soundcloud button should be rendered');
});

test('renders figma button when config.FIGMA is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { FIGMA: 'https://figma.com' } }));
  assert.ok(html.includes('figma'), 'figma button should be rendered');
});

test('renders telegram button when config.TELEGRAM is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { TELEGRAM: 'https://telegram.org' } }));
  assert.ok(html.includes('telegram'), 'telegram button should be rendered');
});

test('renders tumblr button when config.TUMBLR is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { TUMBLR: 'https://tumblr.com' } }));
  assert.ok(html.includes('tumblr'), 'tumblr button should be rendered');
});

test('renders steam button when config.STEAM is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { STEAM: 'https://steam.com' } }));
  assert.ok(html.includes('steam'), 'steam button should be rendered');
});

test('renders vimeo button when config.VIMEO is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { VIMEO: 'https://vimeo.com' } }));
  assert.ok(html.includes('vimeo'), 'vimeo button should be rendered');
});

test('renders wordpress button when config.WORDPRESS is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { WORDPRESS: 'https://wordpress.com' } }));
  assert.ok(html.includes('wordpress'), 'wordpress button should be rendered');
});

test('renders goodreads button when config.GOODREADS is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { GOODREADS: 'https://goodreads.com' } }));
  assert.ok(html.includes('goodreads'), 'goodreads button should be rendered');
});

test('renders skoob button when config.SKOOB is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { SKOOB: 'https://skoob.com' } }));
  assert.ok(html.includes('skoob'), 'skoob button should be rendered');
});

test('renders letterboxd button when config.LETTERBOXD is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { LETTERBOXD: 'https://letterboxd.com' } }));
  assert.ok(html.includes('letterboxd'), 'letterboxd button should be rendered');
});

test('renders mastodon button when config.MASTODON is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { MASTODON: 'https://mastodon.social' } }));
  assert.ok(html.includes('mastodon'), 'mastodon button should be rendered');
});

test('renders microblog button when config.MICRO_BLOG is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { MICRO_BLOG: 'https://micro.blog' } }));
  assert.ok(html.includes('microblog'), 'microblog button should be rendered');
});

test('renders whatsapp button when config.WHATSAPP is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { WHATSAPP: 'https://whatsapp.com' } }));
  assert.ok(html.includes('whatsapp'), 'whatsapp button should be rendered');
});

test('renders kit button when config.KIT is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { KIT: 'https://kit.shorthand.studio' } }));
  assert.ok(html.includes('kit'), 'kit button should be rendered');
});

test('renders strava button when config.STRAVA is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { STRAVA: 'https://strava.com' } }));
  assert.ok(html.includes('strava'), 'strava button should be rendered');
});

test('renders bluesky button when config.BLUESKY is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { BLUESKY: 'https://bsky.social' } }));
  assert.ok(html.includes('bluesky'), 'bluesky button should be rendered');
});

test('renders buymeacoffee button when config.BUYMEACOFFEE is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { BUYMEACOFFEE: 'https://buymeacoffee.com' } }));
  assert.ok(html.includes('buymeacoffee'), 'buymeacoffee button should be rendered');
});

test('renders gitlab button when config.GITLAB is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { GITLAB: 'https://gitlab.com' } }));
  assert.ok(html.includes('gitlab'), 'gitlab button should be rendered');
});

test('renders patreon button when config.PATREON is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { PATREON: 'https://patreon.com' } }));
  assert.ok(html.includes('patreon'), 'patreon button should be rendered');
});

test('renders devto button when config.DEVTO is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { DEVTO: 'https://dev.to' } }));
  assert.ok(html.includes('devto'), 'devto button should be rendered');
});

test('renders paypal button when config.PAYPAL is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { PAYPAL: 'https://paypal.com' } }));
  assert.ok(html.includes('paypal'), 'paypal button should be rendered');
});

test('renders slack button when config.SLACK is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { SLACK: 'https://slack.com' } }));
  assert.ok(html.includes('slack'), 'slack button should be rendered');
});

test('renders stackoverflow button when config.STACKOVERFLOW is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { STACKOVERFLOW: 'https://stackoverflow.com' } }));
  assert.ok(html.includes('stackoverflow'), 'stackoverflow button should be rendered');
});

test('renders lastfm button when config.LASTFM is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { LASTFM: 'https://last.fm' } }));
  assert.ok(html.includes('lastfm'), 'lastfm button should be rendered');
});

test('renders gitea button when config.GITEA is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { GITEA: 'https://gitea.com' } }));
  assert.ok(html.includes('gitea'), 'gitea button should be rendered');
});

test('renders polywork button when config.POLYWORK is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { POLYWORK: 'https://poly.work' } }));
  assert.ok(html.includes('polywork'), 'polywork button should be rendered');
});

test('renders signal button when config.SIGNAL is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { SIGNAL: 'https://signal.org' } }));
  assert.ok(html.includes('signal'), 'signal button should be rendered');
});

test('renders untappd button when config.UNTAPPD is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { UNTAPPD: 'https://untappd.com' } }));
  assert.ok(html.includes('untappd'), 'untappd button should be rendered');
});

test('renders instantgaming button when config.INSTANTGAMING is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { INSTANTGAMING: 'https://instantgaming.com' } }));
  assert.ok(html.includes('instantgaming'), 'instantgaming button should be rendered');
});

test('renders ghost button when config.GHOST is set', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { GHOST: 'https://ghost.org' } }));
  assert.ok(html.includes('ghost'), 'ghost button should be rendered');
});
