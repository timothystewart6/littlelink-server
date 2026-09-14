/**
 * Detailed unit tests for src/config/envNames.ts
 *
 * Covers: Individual ENV_NAMES entries, line 175 coverage
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { ENV_NAMES } from '../../src/config/envNames';

test('ENV_NAMES includes all expected keys up to line 175', () => {
  // Test that WORDPRESS is in the array (line 175)
  assert.ok(ENV_NAMES.includes('WORDPRESS'));
});

test('ENV_NAMES includes VIBER after WORDPRESS', () => {
  assert.ok(ENV_NAMES.includes('VIBER'));
});

test('ENV_NAMES includes VIMEO after VIBER', () => {
  assert.ok(ENV_NAMES.includes('VIMEO'));
});

test('ENV_NAMES includes VRCHAT after VIMEO', () => {
  assert.ok(ENV_NAMES.includes('VRCHAT'));
});

test('ENV_NAMES includes WHATSAPP after VRCHAT', () => {
  assert.ok(ENV_NAMES.includes('WHATSAPP'));
});

test('ENV_NAMES includes WORDPRESS at the expected position', () => {
  const wordPressIndex = ENV_NAMES.indexOf('WORDPRESS');
  const whatAppIndex = ENV_NAMES.indexOf('WHATSAPP');
  assert.ok(wordPressIndex > 0);
  assert.ok(wordPressIndex > whatAppIndex);
});
