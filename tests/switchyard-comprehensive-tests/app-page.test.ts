import { test } from 'node:test';
import assert from 'node:assert';

test('app/page.tsx exports HomePage', async () => {
  const content = await import('../../app/page.tsx');
  assert.ok(content.HomePage || content.default);
});

test('app/page.tsx renders Home component', async () => {
  const content = await import('../../app/page.tsx');
  assert.ok(content.Home || content.default);
});
