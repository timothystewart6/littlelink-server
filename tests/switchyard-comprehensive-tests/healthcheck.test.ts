/**
 * Unit tests for app/healthcheck/route.ts
 *
 * Covers: GET handler, dynamic rendering
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { GET } from '../../app/healthcheck/route';

test('healthcheck returns ok status', async () => {
  const response = await GET();
  assert.strictEqual(response.status, 200);
  const json = await response.json();
  assert.strictEqual(json.status, 'ok');
});