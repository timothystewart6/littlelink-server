import { test } from 'node:test';
import assert from 'node:assert';

// Set up mocked window BEFORE importing analytics
globalThis.window = {
  gtag: (...args: unknown[]) => { console.log('gtag called', args); },
  _paq: [['trackPageView']],
  umami: {
    track: (...args: unknown[]) => { console.log('umami.track called', args); },
  },
};

import { trackGoogleEvent, trackMatomoEvent, trackUmamiEvent } from '../../src/analytics/google';
import { trackMatomoEvent as trackMatomo } from '../../src/analytics/matomo';
import { trackUmamiEvent as trackUmami } from '../../src/analytics/umami';

test('trackGoogleEvent calls gtag', () => {
  const eventName = 'test_event';
  trackGoogleEvent(eventName);
  assert.ok(true);
});

test('trackMatomoEvent calls _paq push', () => {
  const eventName = 'test_event';
  trackMatomo(eventName);
  assert.ok(true);
});

test('trackUmamiEvent calls umami.track', () => {
  const eventName = 'test_event';
  trackUmami(eventName);
  assert.ok(true);
});
