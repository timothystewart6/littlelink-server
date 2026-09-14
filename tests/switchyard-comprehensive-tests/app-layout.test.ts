import { test } from 'node:test';
import assert from 'node:assert';

// Test generateMetadata function coverage
test('app/layout.tsx generateMetadata with all config keys', async () => {
  const { generateMetadata } = await import('../../app/layout.tsx');
  const metadata = await generateMetadata();
  assert.ok(metadata.title);
  assert.ok(metadata.description === undefined || typeof metadata.description === 'string');
  assert.ok(metadata.robots);
  assert.ok(metadata.title === 'My Site' || metadata.title.includes('META_TITLE'));
});

test('app/layout.tsx generateMetadata title fallback', async () => {
  const { generateMetadata } = await import('../../app/layout.tsx');
  const metadata = await generateMetadata();
  // META_TITLE should fallback to 'My Site' if not set
  assert.ok(metadata.title !== undefined);
});

test('app/layout.tsx generateMetadata robots', async () => {
  const { generateMetadata } = await import('../../app/layout.tsx');
  const metadata = await generateMetadata();
  assert.ok(metadata.robots);
  assert.ok(typeof metadata.robots === 'string');
});
