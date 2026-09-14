import { test } from 'node:test';
import assert from 'node:assert';

test('app/robots.txt/route.ts exists and exports GET handler', () => {
  const content = String(require('fs').readFileSync('app/robots.txt/route.ts', 'utf-8'));
  assert.ok(content.includes('export async function GET'));
});

test('app/robots.txt/route builds robots txt', () => {
  const content = String(require('fs').readFileSync('app/robots.txt/route.ts', 'utf-8'));
  assert.ok(content.includes('buildRobotsTxt'));
});
