/**
 * Unit tests for src/analytics/AnalyticsScripts.tsx
 *
 * Covers: AnalyticsScripts component with all provider configurations
 * All meaningful conditional branches and edge cases.
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import AnalyticsScripts, { safeJsEncode } from '../../src/analytics/AnalyticsScripts';

const makeConfig = (overrides: Partial<{ GA_TRACKING_ID?: string; UMAMI_WEBSITE_ID?: string; UMAMI_APP_URL?: string; UMAMI_SCRIPT_NAME?: string; MATOMO_URL?: string; MATOMO_SITE_ID?: string; PLAUSIBLE_DATA_DOMAIN?: string; PLAUSIBLE_DATA_API?: string; PLAUSIBLE_URL?: string }> = {}) => ({
  GA_TRACKING_ID: undefined,
  UMAMI_WEBSITE_ID: undefined,
  UMAMI_APP_URL: undefined,
  UMAMI_SCRIPT_NAME: undefined,
  MATOMO_URL: undefined,
  MATOMO_SITE_ID: undefined,
  PLAUSIBLE_DATA_DOMAIN: undefined,
  PLAUSIBLE_DATA_API: undefined,
  PLAUSIBLE_URL: undefined,
  ...overrides,
});

test('AnalyticsScripts renders with no config', () => {
  const scripts = renderToStaticMarkup(React.createElement(AnalyticsScripts, { config: makeConfig() }));
  assert.ok(typeof scripts === 'string');
});

test('AnalyticsScripts renders Google Analytics when GA_TRACKING_ID set', () => {
  const scripts = renderToStaticMarkup(React.createElement(AnalyticsScripts, { config: makeConfig({ GA_TRACKING_ID: 'G-12345' }) }));
  assert.ok(scripts.includes('googletagmanager.com'));
  assert.ok(scripts.includes('dataLayer'));
});

test('AnalyticsScripts renders Umami Analytics when configured', () => {
  const scripts = renderToStaticMarkup(React.createElement(AnalyticsScripts, { config: makeConfig({ UMAMI_WEBSITE_ID: '123', UMAMI_APP_URL: 'https://umami.example.com' }) }));
  assert.ok(scripts.includes('umami.example.com'));
  assert.ok(scripts.includes('data-website-id'));
});

test('AnalyticsScripts renders Matomo Analytics when configured', () => {
  const scripts = renderToStaticMarkup(React.createElement(AnalyticsScripts, { config: makeConfig({ MATOMO_URL: 'https://matomo.example.com', MATOMO_SITE_ID: '123' }) }));
  assert.ok(scripts.includes('matomo.example.com'));
  assert.ok(scripts.includes('matomo.php'));
  assert.ok(scripts.includes('noscript'));
});

test('AnalyticsScripts renders Plausible Analytics when configured', () => {
  const scripts = renderToStaticMarkup(React.createElement(AnalyticsScripts, { config: makeConfig({ PLAUSIBLE_DATA_DOMAIN: 'example.plausible', PLAUSIBLE_DATA_API: 'abc', PLAUSIBLE_URL: 'https://example.plausible.com' }) }));
  assert.ok(scripts.includes('https://example.plausible.com'));
  assert.ok(scripts.includes('data-domain'));
});

test('AnalyticsScripts renders all providers when all configured', () => {
  const scripts = renderToStaticMarkup(React.createElement(AnalyticsScripts, { config: makeConfig({
    GA_TRACKING_ID: 'G-12345',
    UMAMI_WEBSITE_ID: '123',
    UMAMI_APP_URL: 'https://umami.example.com',
    MATOMO_URL: 'https://matomo.example.com',
    MATOMO_SITE_ID: '123',
    PLAUSIBLE_DATA_DOMAIN: 'example.plausible',
    PLAUSIBLE_DATA_API: 'abc',
    PLAUSIBLE_URL: 'https://example.plausible.com',
  }) }));
  assert.ok(scripts.includes('googletagmanager.com'));
  assert.ok(scripts.includes('umami.example.com'));
  assert.ok(scripts.includes('matomo.example.com'));
  assert.ok(scripts.includes('https://example.plausible.com'));
});

test('safeJsEncode escapes backslash', () => {
  const result = safeJsEncode('test\\backslash');
  assert.ok(result.includes('\\\\'));
});

test('safeJsEncode escapes angle brackets', () => {
  const result = safeJsEncode('test<greater>great');
  assert.ok(result.includes('\\x3C'));
  assert.ok(result.includes('\\x3E'));
});

test('safeJsEncode escapes line separator', () => {
  const result = safeJsEncode('test\u2028line');
  assert.ok(result.includes('\\u2028'));
});

test('safeJsEncode escapes paragraph separator', () => {
  const result = safeJsEncode('test\u2029paragraph');
  assert.ok(result.includes('\\u2029'));
});

test('safeJsEncode returns empty string for non-string input', () => {
  assert.strictEqual(safeJsEncode(123), '');
  assert.strictEqual(safeJsEncode(null), '');
  assert.strictEqual(safeJsEncode(undefined), '');
});

test('AnalyticsScripts no GA script when GA_TRACKING_ID not set', () => {
  const scripts = renderToStaticMarkup(React.createElement(AnalyticsScripts, { config: makeConfig() }));
  assert.ok(!scripts.includes('googletagmanager.com'));
});

test('AnalyticsScripts no Umami script when not configured', () => {
  const scripts = renderToStaticMarkup(React.createElement(AnalyticsScripts, { config: makeConfig() }));
  assert.ok(!scripts.includes('umami.example.com'));
});

test('AnalyticsScripts no Matomo script when not configured', () => {
  const scripts = renderToStaticMarkup(React.createElement(AnalyticsScripts, { config: makeConfig() }));
  assert.ok(!scripts.includes('matomo.php'));
});

test('AnalyticsScripts no Plausible script when not configured', () => {
  const scripts = renderToStaticMarkup(React.createElement(AnalyticsScripts, { config: makeConfig() }));
  assert.ok(!scripts.includes('plausibleUrl'));
});
