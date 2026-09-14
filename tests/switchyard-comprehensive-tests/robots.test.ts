import { test } from 'node:test';
import assert from 'node:assert';
import { buildRobotsTxt } from '../../src/robots/robotsTxt';

test('buildRobotsTxt generates robots.txt with default config', () => {
  const result = buildRobotsTxt({});
  assert.ok(typeof result === 'string');
  assert.ok(result.includes('User-agent'));
});

test('buildRobotsTxt with indexable config', () => {
  const result = buildRobotsTxt({ META_INDEX_STATUS: 'indexable' });
  assert.ok(typeof result === 'string');
  assert.ok(result.includes('Allow'));
});

test('buildRobotsTxt with noindex config', () => {
  const result = buildRobotsTxt({ META_INDEX_STATUS: 'noindex' });
  assert.ok(typeof result === 'string');
  assert.ok(result.includes('Disallow'));
});

test('buildRobotsTxt with custom ROBOTS_TXT override', () => {
  const result = buildRobotsTxt({ ROBOTS_TXT: 'Custom rule\nDisallow: /private' });
  assert.ok(typeof result === 'string');
  assert.ok(result.includes('Custom rule'));
});

test('buildRobotsTxt with empty ROBOTS_TXT uses default', () => {
  const result = buildRobotsTxt({ ROBOTS_TXT: '' });
  assert.ok(typeof result === 'string');
  assert.ok(result.includes('User-agent'));
});

test('buildRobotsTxt with additional rules', () => {
  const result = buildRobotsTxt({ ROBOTS_ADDITIONAL_RULES: 'Disallow: /admin' });
  assert.ok(typeof result === 'string');
  assert.ok(result.includes('Disallow: /admin'));
});

test('buildRobotsTxt with sitemap URL', () => {
  const result = buildRobotsTxt({ META_INDEX_STATUS: 'indexable', OG_URL: 'https://example.com' });
  assert.ok(typeof result === 'string');
  assert.ok(result.includes('Sitemap'));
});
