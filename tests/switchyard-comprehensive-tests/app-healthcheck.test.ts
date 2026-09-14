import { test } from 'node:test';
import assert from 'node:assert';

test('app/healthcheck/route.ts exists and exports GET handler', () => {
  const content = String(require('fs').readFileSync('app/healthcheck/route.ts', 'utf-8'));
  assert.ok(content.includes('export async function GET'));
});

test('app/healthcheck/route returns JSON', () => {
  const content = String(require('fs').readFileSync('app/healthcheck/route.ts', 'utf-8'));
  assert.ok(content.includes('NextResponse.json'));
});
