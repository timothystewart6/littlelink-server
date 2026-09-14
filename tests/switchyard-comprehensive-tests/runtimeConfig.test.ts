/**
 * Unit tests for src/config/runtimeConfig.ts
 *
 * Covers: getRuntimeConfig, getTheme, shouldSkipHealthLog
 * All meaningful conditional branches and edge cases.
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { getRuntimeConfig, getTheme, shouldSkipHealthLog, RuntimeConfig, EnvName, ENV_NAMES } from '../../src/config/runtimeConfig';

const makeConfig = (overrides: Partial<Record<EnvName, string>>): RuntimeConfig => {
  const base: Record<EnvName, string | undefined> = {} as any;
  for (const key of ENV_NAMES) {
    base[key] = undefined;
  }
  return { ...base, ...overrides } as RuntimeConfig;
};

test('getRuntimeConfig returns config with all env names as keys', () => {
  const config = getRuntimeConfig(makeConfig({ THEME: 'Dark', EMAIL: 'test@example.com' }));
  assert.strictEqual(config.THEME, 'Dark');
  assert.strictEqual(config.EMAIL, 'test@example.com');
  // Other env names should be undefined
  assert.strictEqual(config.GA_TRACKING_ID, undefined);
});

test('getRuntimeConfig reads from provided env object', () => {
  const config = getRuntimeConfig(makeConfig({
    THEME: 'Dark',
    SKIP_HEALTH_CHECK_LOGS: 'true',
  }));
  assert.strictEqual(config.THEME, 'Dark');
  assert.strictEqual(config.SKIP_HEALTH_CHECK_LOGS, 'true');
});

test('getRuntimeConfig falls back to process.env when no env provided', () => {
  const config = getRuntimeConfig(undefined);
  // Should return a config with all ENV_NAMES keys present
  for (const key of ENV_NAMES) {
    assert.ok(key in config);
  }
});

test('getRuntimeConfig returns undefined for missing keys when env is empty', () => {
  const config = getRuntimeConfig(makeConfig({}));
  assert.strictEqual(config.THEME, undefined);
});

test('getTheme returns dark for Dark theme', () => {
  assert.strictEqual(getTheme(makeConfig({ THEME: 'Dark' })), 'dark');
});

test('getTheme returns light for other themes', () => {
  assert.strictEqual(getTheme(makeConfig({ THEME: 'light' })), 'light');
  assert.strictEqual(getTheme(makeConfig({ THEME: 'dark' })), 'light');
  assert.strictEqual(getTheme(makeConfig({ THEME: '' })), 'light');
  assert.strictEqual(getTheme(makeConfig({})), 'light');
});

test('shouldSkipHealthLog returns true only for exact true', () => {
  assert.strictEqual(shouldSkipHealthLog(makeConfig({ SKIP_HEALTH_CHECK_LOGS: 'true' })), true);
});

test('shouldSkipHealthLog returns false for other values', () => {
  assert.strictEqual(shouldSkipHealthLog(makeConfig({ SKIP_HEALTH_CHECK_LOGS: 'TRUE' })), false);
  assert.strictEqual(shouldSkipHealthLog(makeConfig({ SKIP_HEALTH_CHECK_LOGS: 'true ' })), false);
  assert.strictEqual(shouldSkipHealthLog(makeConfig({ SKIP_HEALTH_CHECK_LOGS: 'false' })), false);
  assert.strictEqual(shouldSkipHealthLog(makeConfig({ SKIP_HEALTH_CHECK_LOGS: '' })), false);
  assert.strictEqual(shouldSkipHealthLog(makeConfig({})), false);
});