import { test } from 'node:test';
import assert from 'node:assert';
import { ENV_NAMES } from '../../src/config/envNames';
import { getRuntimeConfig, getTheme, shouldSkipHealthLog, RuntimeConfig, Theme, DropShadow } from '../../src/config/runtimeConfig';

test('ENV_NAMES is sorted alphabetically', () => {
  const sorted = [...ENV_NAMES].sort();
  assert.deepStrictEqual(ENV_NAMES, sorted);
});

test('ENV_NAMES has more than 100 entries', () => {
  assert.ok(ENV_NAMES.length > 100);
});

test('ENV_NAMES includes key names', () => {
  assert.ok(ENV_NAMES.includes('THEME'));
  assert.ok(ENV_NAMES.includes('SKIP_HEALTH_CHECK_LOGS'));
});

test('getRuntimeConfig returns config with all env names as keys', () => {
  const config = getRuntimeConfig();
  const keys = Object.keys(config);
  for (const name of ENV_NAMES) {
    assert.ok(keys.includes(name), `Missing env name in config: ${name}`);
  }
});

test('getRuntimeConfig reads from provided env object', () => {
  const config = getRuntimeConfig({
    THEME: 'Dark',
    SKIP_HEALTH_CHECK_LOGS: 'true',
  });
  assert.strictEqual(config.THEME, 'Dark');
  assert.strictEqual(config.SKIP_HEALTH_CHECK_LOGS, 'true');
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

test('RuntimeConfig type is exported', () => {
  const config: RuntimeConfig = { THEME: 'Dark', NAME: 'test' };
  assert.ok(config.THEME === 'Dark' || config.THEME === undefined);
});

test('Theme type is exported', () => {
  const theme: Theme = 'dark';
  assert.strictEqual(theme, 'dark');
});

test('DropShadow type is exported', () => {
  const shadow: DropShadow = 'medium';
  assert.strictEqual(shadow, 'medium');
});
