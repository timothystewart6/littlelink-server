import { test } from 'node:test';
import assert from 'node:assert';
import { ENV_NAMES } from '../../src/config/envNames';

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
  assert.ok(ENV_NAMES.includes('GA_TRACKING_ID'));
  assert.ok(ENV_NAMES.includes('DROP_SHADOW'));
  assert.ok(ENV_NAMES.includes('BUTTON_ORDER'));
  assert.ok(ENV_NAMES.includes('BUTTON_TARGET'));
});
