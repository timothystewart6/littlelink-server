/**
 * Unit tests for src/config/envNames.ts
 *
 * Covers: ENV_NAMES export, type exports (EnvName, RuntimeConfig, Theme, DropShadow)
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { ENV_NAMES, EnvName, RuntimeConfig, Theme, DropShadow } from '../../src/config/envNames';

test('ENV_NAMES is an array', () => {
  assert.ok(Array.isArray(ENV_NAMES));
});

test('ENV_NAMES has more than 100 entries', () => {
  assert.ok(ENV_NAMES.length > 100);
});

test('ENV_NAMES includes key names', () => {
  assert.ok(ENV_NAMES.includes('THEME'));
  assert.ok(ENV_NAMES.includes('SKIP_HEALTH_CHECK_LOGS'));
  assert.ok(ENV_NAMES.includes('GA_TRACKING_ID'));
});

test('ENV_NAMES is sorted alphabetically', () => {
  const sorted = [...ENV_NAMES].sort();
  assert.deepStrictEqual(ENV_NAMES, sorted);
});

test('EnvName type is exported and usable', () => {
  const name: EnvName = 'THEME';
  assert.strictEqual(name, 'THEME');
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