import { test } from 'node:test';
import assert from 'node:assert';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import Home from '../../src/components/Home/Home';

// Test that setting ALL config keys renders all buttons
test('renders all social media buttons when all config keys are set', () => {
  const config: Record<string, string> = {
    NAME: 'Test User',
    BIO: 'Test bio',
    AVATAR_URL: 'https://example.com/avatar.jpg',
    AVATAR_2X_URL: 'https://example.com/avatar2x.jpg',
    AVATAR_ALT: 'Avatar',
    AVATAR_SIZE: 'medium',
    DROP_SHADOW: 'medium',
    BUTTON_TARGET: '_blank',
    BUTTON_ORDER: 'youtube,twitch,twitter,instagram,github,discord,tiktok,facebook,facebookmessenger,linkedin,producthunt,snapchat,spotify,reddit,medium,pinterest,email,email_alt,soundcloud,figma,telegram,tumblr,steam,vimeo,wordpress,goodreads,skoob,letterboxd,mastodon,microblog,whatsapp,kit,strava,bluesky,buymeacoffee,gitlab,patreon,devto,paypal,slack,stackoverflow,lastfm,gitea,polywork,signal,untappd,instantgaming,ghost,vero,viber,x,xing,youtube_music,amazon_affiliate,amazon_wishlist,anilist,apple_music,apple_podcasts,audius,bandcamp,cashapp,codewars,credly,designbyhumans,dockerhub,dreamwidth,fivehundredpx,flickr,forgejo,geocaching,gitbucket,googlemaps,googlescholar,google_podcasts,internetarchive,jetphotos,kakaotalk,keybase,lemmy,line,makerworld,matrix,mixcloud,myanimelist,neocities,onlyfans,orcid,osu,overcast,pillowfort,pixelfed,pocket_casts,printables,privatebin,rss,semanticscholar,serializd,session,shazam,simplex,spacehey,status,streamlabs,substack,teespring,thestorygraph,threads,threema,tidal,tpdb,trakt,venmo,vrchat',
    YOUTUBE: 'https://youtube.com',
    TWITCH: 'https://twitch.com',
    TWITTER: 'https://twitter.com',
    INSTAGRAM: 'https://instagram.com',
    GITHUB: 'https://github.com',
    DISCORD: 'https://discord.com',
    TIKTOK: 'https://tiktok.com',
    FACEBOOK: 'https://facebook.com',
    FACEBOOK_MESSENGER: 'https://messenger.com',
    LINKED_IN: 'https://linkedin.com',
    PRODUCT_HUNT: 'https://producthunt.com',
    SNAPCHAT: 'https://snapchat.com',
    SPOTIFY: 'https://spotify.com',
    REDDIT: 'https://reddit.com',
    MEDIUM: 'https://medium.com',
    PINTEREST: 'https://pinterest.com',
    EMAIL: 'test@example.com',
    EMAIL_TEXT: 'Email me',
    EMAIL_ALT: 'alt@example.com',
    EMAIL_ALT_TEXT: 'Alt email',
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
    KIT: 'https://kit.shorthand.studio',
    STRAVA: 'https://strava.com',
    BLUESKY: 'https://bsky.social',
    BUYMEACOFFEE: 'https://buymeacoffee.com',
    GITLAB: 'https://gitlab.com',
    PATREON: 'https://patreon.com',
    DEVTO: 'https://dev.to',
    PAYPAL: 'https://paypal.com',
    SLACK: 'https://slack.com',
    STACKOVERFLOW: 'https://stackoverflow.com',
    LASTFM: 'https://last.fm',
    GITEA: 'https://gitea.com',
    POLYWORK: 'https://poly.work',
    SIGNAL: 'https://signal.org',
    UNTAPPD: 'https://untappd.com',
    INSTANTGAMING: 'https://instantgaming.com',
    GHOST: 'https://ghost.org',
    VERO: 'https://vero.co',
    VIBER: 'https://viber.com',
    X: 'https://x.com',
    XING: 'https://xing.com',
    YOUTUBE_MUSIC: 'https://music.youtube.com',
    AMAZON_AFFILIATE: 'https://amazon.com',
    AMAZON_WISHLIST: 'https://amazon.com/wishlist',
    ANILIST: 'https://anilist.co',
    APPLE_MUSIC: 'https://music.apple.com',
    APPLE_PODCASTS: 'https://podcasts.apple.com',
    AUDIUS: 'https://audius.co',
    BANDCAMP: 'https://bandcamp.com',
    CASHAPP: 'https://cash.app',
    CODEWARS: 'https://codewars.com',
    CREDLY: 'https://credly.com',
    DESIGNBYHUMANS: 'https://designbyhumans.com',
    DOCKERHUB: 'https://hub.docker.com',
    DREAMWIDTH: 'https://dreamwidth.org',
    FIVEHUNDREDPX: 'https://500px.com',
    FLICKR: 'https://flickr.com',
    FORGEJO: 'https://forgejo.org',
    GEOCACHING: 'https://geocaching.com',
    GITBUCKET: 'https://gitbucket.com',
    GOOGLEMAPS: 'https://maps.google.com',
    GOOGLESCHOLAR: 'https://scholar.google.com',
    GOOGLE_PODCASTS: 'https://podcasts.google.com',
    INTERNETARCHIVE: 'https://archive.org',
    JETPHOTOS: 'https://jetphotos.com',
    KAKAOTALK: 'https://kakaotalk.com',
    KEYBASE: 'https://keybase.io',
    LEMMY: 'https://lemmy.ml',
    LINE: 'https://line.me',
    MAKERWORLD: 'https://makerworld.com',
    MATRIX: 'https://matrix.org',
    MIXCLOUD: 'https://mixcloud.com',
    MYANIMELIST: 'https://myanimelist.net',
    NEOCITIES: 'https://neocities.org',
    ONLYFANS: 'https://onlyfans.com',
    ORCID: 'https://orcid.org',
    OSU: 'https://osu.ppy.sh',
    OVERCAST: 'https://overcast.fm',
    PILLOWFORT: 'https://pillowfort.social',
    PIXELFED: 'https://pixelfed.social',
    POCKET_CASTS: 'https://pocketcasts.com',
    PRINTABLES: 'https://printables.com',
    PRIVATEBIN: 'https://privatebin.net',
    RSS: 'https://example.com/rss',
    SEMANTICSCHOLAR: 'https://semanticscholar.org',
    SERIALIZD: 'https://serializd.com',
    SESSION: 'https://getsession.org',
    SHAZAM: 'https://shazam.com',
    SIMPLEX: 'https://simplex.chat',
    SPACEHEY: 'https://spacehey.com',
    STATUS: 'https://status.example.com',
    STREAMLABS: 'https://streamlabs.com',
    SUBSTACK: 'https://substack.com',
    TEESPRING: 'https://teespring.com',
    THESTORYGRAPH: 'https://thestorygraph.com',
    THREADS: 'https://threads.net',
    THREEMA: 'https://threema.ch',
    TIDAL: 'https://tidal.com',
    TPDB: 'https://thetvdb.com',
    TRAKT: 'https://trakt.tv',
    VENMO: 'https://venmo.com',
    VRCHAT: 'https://vrchat.com',
    FOOTER: 'Footer text',
    SHARE: 'https://example.com/share',
    OG_TITLE: 'OG Title',
    OG_DESCRIPTION: 'OG Description',
  };

  const html = renderToStaticMarkup(React.createElement(Home, { config: config as any }));
  assert.ok(html.length > 0, 'should render HTML');
  assert.ok(html.includes('Test User'), 'should render name');
  assert.ok(html.includes('Test bio'), 'should render bio');
  assert.ok(html.includes('youtube'), 'should render youtube');
  assert.ok(html.includes('github'), 'should render github');
  assert.ok(html.includes('twitter'), 'should render twitter');
  assert.ok(html.includes('instagram'), 'should render instagram');
  assert.ok(html.includes('discord'), 'should render discord');
  assert.ok(html.includes('tiktok'), 'should render tiktok');
  assert.ok(html.includes('facebook'), 'should render facebook');
  assert.ok(html.includes('linkedin'), 'should render linkedin');
  assert.ok(html.includes('spotify'), 'should render spotify');
  assert.ok(html.includes('reddit'), 'should render reddit');
  assert.ok(html.includes('medium'), 'should render medium');
  assert.ok(html.includes('pinterest'), 'should render pinterest');
  assert.ok(html.includes('soundcloud'), 'should render soundcloud');
  assert.ok(html.includes('figma'), 'should render figma');
  assert.ok(html.includes('telegram'), 'should render telegram');
  assert.ok(html.includes('tumblr'), 'should render tumblr');
  assert.ok(html.includes('steam'), 'should render steam');
  assert.ok(html.includes('vimeo'), 'should render vimeo');
  assert.ok(html.includes('wordpress'), 'should render wordpress');
  assert.ok(html.includes('goodreads'), 'should render goodreads');
  assert.ok(html.includes('skoob'), 'should render skoob');
  assert.ok(html.includes('letterboxd'), 'should render letterboxd');
  assert.ok(html.includes('mastodon'), 'should render mastodon');
  assert.ok(html.includes('microblog'), 'should render microblog');
  assert.ok(html.includes('whatsapp'), 'should render whatsapp');
  assert.ok(html.includes('strava'), 'should render strava');
  assert.ok(html.includes('bluesky'), 'should render bluesky');
  assert.ok(html.includes('buymeacoffee'), 'should render buymeacoffee');
  assert.ok(html.includes('gitlab'), 'should render gitlab');
  assert.ok(html.includes('patreon'), 'should render patreon');
  assert.ok(html.includes('devto'), 'should render devto');
  assert.ok(html.includes('paypal'), 'should render paypal');
  assert.ok(html.includes('slack'), 'should render slack');
  assert.ok(html.includes('stackoverflow'), 'should render stackoverflow');
  assert.ok(html.includes('lastfm'), 'should render lastfm');
  assert.ok(html.includes('gitea'), 'should render gitea');
  assert.ok(html.includes('polywork'), 'should render polywork');
  assert.ok(html.includes('signal'), 'should render signal');
  assert.ok(html.includes('untappd'), 'should render untappd');
  assert.ok(html.includes('instantgaming'), 'should render instantgaming');
  assert.ok(html.includes('ghost'), 'should render ghost');
  assert.ok(html.includes('vero'), 'should render vero');
  assert.ok(html.includes('viber'), 'should render viber');
  assert.ok(html.includes('xing'), 'should render xing');
  assert.ok(html.includes('youtube_music'), 'should render youtube_music');
  assert.ok(html.includes('amazon'), 'should render amazon');
  assert.ok(html.includes('anilist'), 'should render anilist');
  assert.ok(html.includes('apple_music'), 'should render apple_music');
  assert.ok(html.includes('apple_podcasts'), 'should render apple_podcasts');
  assert.ok(html.includes('audius'), 'should render audius');
  assert.ok(html.includes('bandcamp'), 'should render bandcamp');
  assert.ok(html.includes('cashapp'), 'should render cashapp');
  assert.ok(html.includes('codewars'), 'should render codewars');
  assert.ok(html.includes('credly'), 'should render credly');
  assert.ok(html.includes('designbyhumans'), 'should render designbyhumans');
  assert.ok(html.includes('dockerhub'), 'should render dockerhub');
  assert.ok(html.includes('dreamwidth'), 'should render dreamwidth');
  assert.ok(html.includes('500px'), 'should render 500px');
  assert.ok(html.includes('flickr'), 'should render flickr');
  assert.ok(html.includes('forgejo'), 'should render forgejo');
  assert.ok(html.includes('geocaching'), 'should render geocaching');
  assert.ok(html.includes('gitbucket'), 'should render gitbucket');
  assert.ok(html.includes('googlemaps'), 'should render googlemaps');
  assert.ok(html.includes('googlescholar'), 'should render googlescholar');
  assert.ok(html.includes('google_podcasts'), 'should render google_podcasts');
  assert.ok(html.includes('internetarchive'), 'should render internetarchive');
  assert.ok(html.includes('jetphotos'), 'should render jetphotos');
  assert.ok(html.includes('kakaotalk'), 'should render kakaotalk');
  assert.ok(html.includes('keybase'), 'should render keybase');
  assert.ok(html.includes('lemmy'), 'should render lemmy');
  assert.ok(html.includes('line'), 'should render line');
  assert.ok(html.includes('makerworld'), 'should render makerworld');
  assert.ok(html.includes('matrix'), 'should render matrix');
  assert.ok(html.includes('mixcloud'), 'should render mixcloud');
  assert.ok(html.includes('myanimelist'), 'should render myanimelist');
  assert.ok(html.includes('neocities'), 'should render neocities');
  assert.ok(html.includes('onlyfans'), 'should render onlyfans');
  assert.ok(html.includes('orcid'), 'should render orcid');
  assert.ok(html.includes('osu'), 'should render osu');
  assert.ok(html.includes('overcast'), 'should render overcast');
  assert.ok(html.includes('pillowfort'), 'should render pillowfort');
  assert.ok(html.includes('pixelfed'), 'should render pixelfed');
  assert.ok(html.includes('pocket_casts'), 'should render pocket_casts');
  assert.ok(html.includes('printables'), 'should render printables');
  assert.ok(html.includes('privatebin'), 'should render privatebin');
  assert.ok(html.includes('rss'), 'should render rss');
  assert.ok(html.includes('semanticscholar'), 'should render semanticscholar');
  assert.ok(html.includes('serializd'), 'should render serializd');
  assert.ok(html.includes('session'), 'should render session');
  assert.ok(html.includes('shazam'), 'should render shazam');
  assert.ok(html.includes('simplex'), 'should render simplex');
  assert.ok(html.includes('spacehey'), 'should render spacehey');
  assert.ok(html.includes('status'), 'should render status');
  assert.ok(html.includes('streamlabs'), 'should render streamlabs');
  assert.ok(html.includes('substack'), 'should render substack');
  assert.ok(html.includes('teespring'), 'should render teespring');
  assert.ok(html.includes('thestorygraph'), 'should render thestorygraph');
  assert.ok(html.includes('threads'), 'should render threads');
  assert.ok(html.includes('threema'), 'should render threema');
  assert.ok(html.includes('tidal'), 'should render tidal');
  assert.ok(html.includes('tpdb'), 'should render tpdb');
  assert.ok(html.includes('trakt'), 'should render trakt');
  assert.ok(html.includes('venmo'), 'should render venmo');
  assert.ok(html.includes('vrchat'), 'should render vrchat');
  assert.ok(html.includes('Footer text'), 'should render footer');
  assert.ok(html.includes('OG Title'), 'should render OG title');
  assert.ok(html.includes('OG Description'), 'should render OG description');
});
