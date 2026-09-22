// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home component', () => {
  it('renders with default config - avatar, bio, footer', () => {
    const { container } = render(
      <Home config={{
        AVATAR_URL: 'https://example.com/avatar.jpg',
        BIO: 'Test bio',
      }} as any />,
    );
    expect(container.innerHTML).toContain('avatar');
    expect(container.innerHTML).toContain('Test bio');
  });

  it('renders with BUTTON_ORDER config', () => {
    const { container } = render(
      <Home config={{ BUTTON_ORDER: 'button1,button2' }} as any />,
    );
    expect(container.innerHTML).toContain('ro');
  });

  it('renders custom buttons when CUSTOM_BUTTON_NAME is provided', () => {
    const { container } = render(
      <Home config={{
        CUSTOM_BUTTON_NAME: 'btn1,btn2',
        CUSTOM_BUTTON_URL: 'https://example.com,https://example2.com',
        CUSTOM_BUTTON_TEXT: 'Text1,Text2',
        CUSTOM_BUTTON_ALT_TEXT: 'Alt1,Alt2',
        CUSTOM_BUTTON_COLOR: 'blue,red',
        CUSTOM_BUTTON_TEXT_COLOR: 'white,black',
        CUSTOM_BUTTON_ICON: 'icon1,icon2',
      }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('renders THESTORYGRAPH button when config has it', () => {
    const { container } = render(
      <Home config={{ THESTORYGRAPH: 'https://thestorygraph.org' }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('renders GEOCACHING button when config has it', () => {
    const { container } = render(
      <Home config={{ GEOCACHING: 'https://geocaching.example.com' }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('renders NEOCITIES button when config has it', () => {
    const { container } = render(
      <Home config={{ NEOCITIES: 'https://neocities.org' }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('renders DREAMWIDTH button when config has it', () => {
    const { container } = render(
      <Home config={{ DREAMWIDTH: 'https://dreamwidth.org' }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('renders SPACEHEY button when config has it', () => {
    const { container } = render(
      <Home config={{ SPACEHEY: 'https://spacehey.com' }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('renders VIBER button when config has it', () => {
    const { container } = render(
      <Home config={{ VIBER: 'https://viber.example.com' }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('renders PILLOWFORT button when config has it', () => {
    const { container } = render(
      <Home config={{ PILLOWFORT: 'https://pillowfort.example.com' }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('renders MAKERWORLD button when config has it', () => {
    const { container } = render(
      <Home config={{ MAKERWORLD: 'https://makerworld.example.com' }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('renders footer when FOOTER config is provided', () => {
    const { container } = render(
      <Home config={{ FOOTER: 'Footer text' }} as any />,
    );
    expect(container.innerHTML).toContain('Footer text');
  });

  it('renders Share link in footer when share props are provided', () => {
    const { container } = render(
      <Home config={{
        FOOTER: 'Footer',
        SHARE: 'https://example.com',
        OG_TITLE: 'Test Title',
        OG_DESCRIPTION: 'Test Description',
      }} as any />,
    );
    expect(container.innerHTML).toContain('rel="noopener noreferrer"');
  });

  it('renders avatar when config has avatar props', () => {
    const { container } = render(
      <Home config={{
        AVATAR_URL: 'https://example.com/avatar.jpg',
        BIO: 'Test bio',
      }} as any />,
    );
    expect(container.innerHTML).toContain('avatar');
  });

  it('renders name when config has NAME', () => {
    const { container } = render(
      <Home config={{ NAME: 'Test Name' }} as any />,
    );
    expect(container.innerHTML).toContain('Test Name');
  });

  it('renders bio when config has BIO', () => {
    const { container } = render(
      <Home config={{ BIO: 'Test bio' }} as any />,
    );
    expect(container.innerHTML).toContain('Test bio');
  });

  it('does not render name when config has no NAME', () => {
    const { container } = render(
      <Home config={{}} as any />,
    );
    expect(container.innerHTML).not.toContain('h1');
  });

  it('does not render bio when config has no BIO', () => {
    const { container } = render(
      <Home config={{}} as any />,
    );
    expect(container.innerHTML).not.toContain('p>Test bio');
  });

  it('renders custom buttons partially when some props are missing', () => {
    const { container } = render(
      <Home config={{
        CUSTOM_BUTTON_NAME: 'btn1,btn2',
        CUSTOM_BUTTON_URL: 'https://example.com',
        // Missing CUSTOM_BUTTON_TEXT, etc.
      }} as any />,
    );
    // When not all props are provided, no buttons render
    expect(container.innerHTML).not.toContain('button');
  });

  it('renders with empty config object', () => {
    const { container } = render(
      <Home config={{}} as any />,
    );
    expect(container.innerHTML).toContain('container');
  });

  it('renders YOUTUBE button when config has it', () => {
    const { container } = render(
      <Home config={{ YOUTUBE: 'https://youtube.com' }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('renders TWITTER button when config has it', () => {
    const { container } = render(
      <Home config={{ TWITTER: 'https://twitter.com' }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('renders GITHUB button when config has it', () => {
    const { container } = render(
      <Home config={{ GITHUB: 'https://github.com' }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('renders REDDIT button when config has it', () => {
    const { container } = render(
      <Home config={{ REDDIT: 'https://reddit.com' }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('runs PRODUCT_HUNT button when config has it', () => {
    const { container } = render(
      <Home config={{ PRODUCT_HUNT: 'https://producthunt.com' }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('runs BUYMEACOFFEE button when config has it', () => {
    const { container } = render(
      <Home config={{ BUYMEACOFFEE: 'https://buymeacoffee.com' }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('renders footer with share when all share props are provided', () => {
    const { container } = render(
      <Home config={{
        FOOTER: 'Footer',
        SHARE: 'https://example.com',
        OG_TITLE: 'Test Title',
        OG_DESCRIPTION: 'Test Description',
      }} as any />,
    );
    expect(container.innerHTML).toContain('rel="noopener noreferrer"');
  });

  it('renders custom buttons with partial prop arrays', () => {
    const { container } = render(
      <Home config={{
        CUSTOM_BUTTON_NAME: 'btn1,btn2,btn3',
        CUSTOM_BUTTON_URL: 'https://example.com',
        CUSTOM_BUTTON_TEXT: 'Text1,Text2',
        CUSTOM_BUTTON_ALT_TEXT: 'Alt1,Alt2',
        CUSTOM_BUTTON_COLOR: 'blue',
        CUSTOM_BUTTON_TEXT_COLOR: 'white',
        CUSTOM_BUTTON_ICON: 'icon',
      }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });

  it('renders custom buttons when texts is null', () => {
    const { container } = render(
      <Home config={{
        CUSTOM_BUTTON_NAME: 'btn1,btn2',
        CUSTOM_BUTTON_URL: 'https://example.com,https://example2.com',
        CUSTOM_BUTTON_TEXT: null,
        CUSTOM_BUTTON_ALT_TEXT: 'Alt1,Alt2',
        CUSTOM_BUTTON_COLOR: 'blue,red',
        CUSTOM_BUTTON_TEXT_COLOR: 'white,black',
        CUSTOM_BUTTON_ICON: 'icon1,icon2',
      }} as any />,
    );
    // When texts is null, renderCustomButtons returns null, so no custom button should appear
    expect(container.innerHTML).not.toContain('data-order');
  });
});

describe('Home component - all config buttons', () => {
  it('renders all inline config buttons when all props are provided', () => {
    const { container } = render(
      <Home config={{
        TWITCH: 'https://twitch.tv',
        INSTAGRAM: 'https://instagram.com',
        DISCORD: 'https://discord.com',
        TIKTOK: 'https://tiktok.com',
        FACEBOOK: 'https://facebook.com',
        FACEBOOK_MESSENGER: 'https://messenger.com',
        LINKED_IN: 'https://linkedin.com',
        SNAPCHAT: 'https://snapchat.com',
        SPOTIFY: 'https://spotify.com',
        MEDIUM: 'https://medium.com',
        PINTEREST: 'https://pinterest.com',
        SOUND_CLOUD: 'https://soundcloud.com',
        FIGMA: 'https://figma.com',
        TELEGRAM: 'https://telegram.org',
        TUMBLR: 'https://tumblr.com',
        STEAM: 'https://steam.com',
        VIMEO: 'https://vimeo.com',
        WORDPRESS: 'https://wordpress.com',
        GOODREADS: 'https://goodreads.com',
        SKOOB: 'https://skoob.com',
        LETTERBOXD: 'https://letterboxd.com',
        MASTODON: 'https://mastodon.social',
        MICRO_BLOG: 'https://micro.blog',
        WHATSAPP: 'https://whatsapp.com',
        KIT: 'https://kit.com',
        STRAVA: 'https://strava.com',
        BLUESKY: 'https://bsky.app',
        GITLAB: 'https://gitlab.com',
        PATREON: 'https://patreon.com',
        DEVTO: 'https://dev.to',
        PAYPAL: 'https://paypal.com',
        SLACK: 'https://slack.com',
        STACKOVERFLOW: 'https://stackoverflow.com',
        LASTFM: 'https://last.fm',
        GITEA: 'https://gitea.com',
        POLYWORK: 'https://polywork.com',
        SIGNAL: 'https://signal.org',
        UNTAPPD: 'https://untappd.com',
        INSTANTGAMING: 'https://instantgaming.com',
        GHOST: 'https://ghost.org',
        TRAKT: 'https://trakt.tv',
        CASHAPP: 'https://cash.app',
        TEESPRING: 'https://teespring.com',
        XING: 'https://xing.com',
        KEYBASE: 'https://keybase.io',
        ONLYFANS: 'https://onlyfans.com',
        SESSION: 'https://getsession.org',
        THREEMA: 'https://threema.ch',
        STREAMLABS: 'https://streamlabs.com',
        PRIVATEBIN: 'https://privatebin.net',
        AMAZON_AFFILIATE: 'https://amazon.com',
        AMAZON_WISHLIST: 'https://amazon.com/wishlist',
        APPLE_MUSIC: 'https://music.apple.com',
        YOUTUBE_MUSIC: 'https://music.youtube.com',
        VENMO: 'https://venmo.com',
        STATUS: 'https://status.example.com',
        MATRIX: 'https://matrix.org',
        ANILIST: 'https://anilist.co',
        GITBUCKET: 'https://gitbucket.com',
        SHAZAM: 'https://shazam.com',
        FLICKR: 'https://flickr.com',
        TPDB: 'https://thetvdb.com',
        OSU: 'https://osu.ppy.sh',
        KAKAOTALK: 'https://kakaotalk.com',
        LINE: 'https://line.me',
        DESIGNBYHUMANS: 'https://designbyhumans.com',
        DOCKERHUB: 'https://hub.docker.com',
        VERO: 'https://vero.co',
        MYANIMELIST: 'https://myanimelist.net',
        FIVEHUNDREDPX: 'https://500px.com',
        JETPHOTOS: 'https://jetphotos.com',
        SUBSTACK: 'https://substack.com',
        PRINTABLES: 'https://printables.com',
        SERIALIZD: 'https://serializd.com',
        THREADS: 'https://threads.net',
        LEMMY: 'https://lemmy.world',
        PIXELFED: 'https://pixelfed.social',
        VRCHAT: 'https://vrchat.com',
        X: 'https://x.com',
        CODEWARS: 'https://codewars.com',
        APPLE_PODCASTS: 'https://podcasts.apple.com',
        GOOGLE_PODCASTS: 'https://podcasts.google.com',
        POCKET_CASTS: 'https://pocketcasts.com',
        OVERCAST: 'https://overcast.fm',
        RSS: 'https://example.com/rss',
        AUDIUS: 'https://audius.co',
        BANDCAMP: 'https://bandcamp.com',
        FORGEJO: 'https://forgejo.org',
        ORCID: 'https://orcid.org',
        CREDLY: 'https://credly.com',
        SEMANTICSCHOLAR: 'https://semanticscholar.org',
        GOOGLESCHOLAR: 'https://scholar.google.com',
        SIMPLEX: 'https://simplex.chat',
        MIXCLOUD: 'https://mixcloud.com',
        INTERNETARCHIVE: 'https://archive.org',
        GOOGLEMAPS: 'https://maps.google.com',
        TIDAL: 'https://tidal.com',
      }} as any />,
    );
    expect(container.innerHTML).toContain('button');
  });
});
