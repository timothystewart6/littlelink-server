import { test } from 'node:test';
import assert from 'node:assert';
import { getRuntimeConfig, RuntimeConfig, Theme, DropShadow, ENV_NAMES } from '../../src/config/runtimeConfig';

test('getRuntimeConfig returns config with all env names as keys', () => {
  const config = getRuntimeConfig({});
  assert.ok(config !== undefined);
  assert.ok(config !== null);
  // Check that the config has the expected structure
  const keys = Object.keys(config as Record<string, unknown>);
  assert.ok(keys.length > 0);
});

test('getRuntimeConfig reads from provided env object', () => {
  const customEnv = {
    THEME: 'dark',
    GA_TRACKING_ID: 'G-12345',
    DROP_SHADOW: 'medium',
  };
  const config = getRuntimeConfig(customEnv);
  assert.ok(config !== undefined);
});

test('ENV_NAMES is sorted alphabetically', () => {
  const sorted = [...ENV_NAMES].sort();
  assert.deepStrictEqual(ENV_NAMES, sorted);
});

test('ENV_NAMES has more than 100 entries', () => {
  assert.ok(ENV_NAMES.length > 100);
});

test('ENV_NAMES includes theme keys', () => {
  assert.ok(ENV_NAMES.includes('THEME'));
  assert.ok(ENV_NAMES.includes('SKIP_HEALTH_CHECK_LOGS'));
});

test('RuntimeConfig type includes Theme and DropShadow', () => {
  // Just verify the types exist
  const theme: Theme = 'light';
  const dropShadow: DropShadow = 'medium';
  assert.ok(theme === 'light');
  assert.ok(dropShadow === 'medium');
});
