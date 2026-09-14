import { test } from 'node:test';
import assert from 'node:assert';

test('app/sitemap.xml/route.ts exists and exports GET handler', () => {
  const content = String(require('fs').readFileSync('app/sitemap.xml/route.ts', 'utf-8'));
  assert.ok(content.includes('export async function GET'));
});

test('app/sitemap.xml/route builds sitemap xml', () => {
  const content = String(require('fs').readFileSync('app/sitemap.xml/route.ts', 'utf-8'));
  assert.ok(content.includes('buildSitemapXml'));
});
