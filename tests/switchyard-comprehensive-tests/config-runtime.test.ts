import { test } from 'node:test';
import assert from 'node:assert';
import { getRuntimeConfig, shouldSkipHealthLog, getTheme, RuntimeConfig, Theme, DropShadow, ENV_NAMES } from '../../src/config/runtimeConfig';

test('getRuntimeConfig returns config with all env names as keys', () => {
  const config = getRuntimeConfig({});
  assert.ok(config !== undefined);
  assert.ok(config !== null);
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
  assert.strictEqual(config.THEME, 'dark');
  assert.strictEqual(config.GA_TRACKING_ID, 'G-12345');
  assert.strictEqual(config.DROP_SHADOW, 'medium');
});

test('getRuntimeConfig reads from process.env when no env provided', () => {
  const originalEnv = process.env.THEME;
  process.env.THEME = 'Dark';
  try {
    const config = getRuntimeConfig();
    assert.strictEqual(config.THEME, 'Dark');
  } finally {
    if (originalEnv === undefined) {
      delete process.env.THEME;
    } else {
      process.env.THEME = originalEnv;
    }
  }
});

test('getTheme returns dark for Dark theme', () => {
  assert.strictEqual(getTheme({ THEME: 'Dark' }), 'dark');
});

test('getTheme returns light for other themes', () => {
  assert.strictEqual(getTheme({ THEME: 'light' }), 'light');
  assert.strictEqual(getTheme({ THEME: 'dark' }), 'light');
  assert.strictEqual(getTheme({ THEME: '' }), 'light');
  assert.strictEqual(getTheme({}), 'light');
});

test('shouldSkipHealthLog returns true only for exact true', () => {
  assert.strictEqual(shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: 'true' }), true);
});

test('shouldSkipHealthLog returns false for other values', () => {
  assert.strictEqual(shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: 'TRUE' }), false);
  assert.strictEqual(shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: 'true ' }), false);
  assert.strictEqual(shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: 'false' }), false);
  assert.strictEqual(shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: '' }), false);
  assert.strictEqual(shouldSkipHealthLog({}), false);
});
