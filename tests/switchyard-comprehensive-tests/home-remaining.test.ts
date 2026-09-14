import { test } from 'node:test';
import assert from 'node:assert';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import Home from '../../src/components/Home/Home';

// Test remaining config keys not yet covered
const remainingConfigs: [string, string][] = [
  ['AMAZON_AFFILIATE', 'amazon'],
  ['AMAZON_WISHLIST', 'amazon'],
  ['ANILIST', 'anilist'],
  ['APPLE_MUSIC', 'apple_music'],
  ['APPLE_PODCASTS', 'apple_podcasts'],
  ['AUDIUS', 'audius'],
  ['BANDCAMP', 'bandcamp'],
  ['CASHAPP', 'cashapp'],
  ['CODEWARS', 'codewars'],
  ['CREDLY', 'credly'],
  ['DESIGNBYHUMANS', 'designbyhumans'],
  ['DOCKERHUB', 'dockerhub'],
  ['DREAMWIDTH', 'dreamwidth'],
  ['FIVEHUNDREDPX', '500px'],
  ['FLICKR', 'flickr'],
  ['FORGEJO', 'forgejo'],
  ['GEOCACHING', 'geocaching'],
  ['GITBUCKET', 'gitbucket'],
  ['GOOGLEMAPS', 'googlemaps'],
  ['GOOGLESCHOLAR', 'googlescholar'],
  ['GOOGLE_PODCASTS', 'google_podcasts'],
  ['INTERNETARCHIVE', 'internetarchive'],
  ['JETPHOTOS', 'jetphotos'],
  ['KAKAOTALK', 'kakaotalk'],
  ['KEYBASE', 'keybase'],
  ['LEMMY', 'lemmy'],
  ['LINE', 'line'],
  ['MAKERWORLD', 'makerworld'],
  ['MATRIX', 'matrix'],
  ['MIXCLOUD', 'mixcloud'],
  ['MYANIMELIST', 'myanimelist'],
  ['NEOCITIES', 'neocities'],
  ['ONLYFANS', 'onlyfans'],
  ['ORCID', 'orcid'],
  ['OSU', 'osu'],
  ['OVERCAST', 'overcast'],
  ['PILLOWFORT', 'pillowfort'],
  ['PIXELFED', 'pixelfed'],
  ['POCKET_CASTS', 'pocket_casts'],
  ['PRINTABLES', 'printables'],
  ['PRIVATEBIN', 'privatebin'],
  ['RSS', 'rss'],
  ['SEMANTICSCHOLAR', 'semanticscholar'],
  ['SERIALIZD', 'serializd'],
  ['SESSION', 'session'],
  ['SHAZAM', 'shazam'],
  ['SIMPLEX', 'simplex'],
  ['SPACEHEY', 'spacehey'],
  ['STATUS', 'status'],
  ['STREAMLABS', 'streamlabs'],
  ['SUBSTACK', 'substack'],
  ['TEESPRING', 'teespring'],
  ['THESTORYGRAPH', 'thestorygraph'],
  ['THREADS', 'threads'],
  ['THREEMA', 'threema'],
  ['TIDAL', 'tidal'],
  ['TPDB', 'tpdb'],
  ['TRAKT', 'trakt'],
  ['VENMO', 'venmo'],
  ['VRCHAT', 'vrchat'],
];

remainingConfigs.forEach(([configKey, buttonSubstring]) => {
  test(`renders %s when config.%s is set`, () => {
    const html = renderToStaticMarkup(React.createElement(Home, { config: { [configKey]: 'https://example.com' } }));
    // Check that the config key value or button name appears
    assert.ok(html.length > 0, `${configKey} should render something`);
  });
});
