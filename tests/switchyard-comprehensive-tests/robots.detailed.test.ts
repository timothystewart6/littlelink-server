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
  const result = buildRobotsTxt({ ROBOTS_TXT: 'Custom robots text' });
  assert.ok(typeof result === 'string');
  assert.ok(result.includes('Custom robots text'));
});

test('buildRobotsTxt with empty ROBOTS_TXT uses default', () => {
  const result = buildRobotsTxt({ ROBOTS_TXT: '' });
  assert.ok(typeof result === 'string');
  assert.ok(result.includes('User-agent'));
});

test('buildRobotsTxt with noindex and no ROBOTS_TXT', () => {
  const result = buildRobotsTxt({ META_INDEX_STATUS: 'noindex' });
  assert.ok(typeof result === 'string');
  assert.ok(result.includes('Disallow'));
});
