import { test } from 'node:test';
import assert from 'node:assert';
import React from 'react';

test('app/layout.tsx generateMetadata with all config keys', async () => {
  const { generateMetadata } = await import('../../app/layout.tsx');
  const metadata = await generateMetadata();
  assert.ok(metadata.title);
  assert.ok(metadata.description === undefined || typeof metadata.description === 'string');
  assert.ok(metadata.robots);
  assert.ok(typeof metadata.robots === 'string');
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

test('app/layout.tsx RootLayout renders with theme', async () => {
  const module = await import('../../app/layout.tsx');
  const RootLayout = module.default;
  const result = await RootLayout({ children: React.createElement('div', null) });
  assert.ok(React.isValidElement(result));
  assert.strictEqual(result.props.lang, 'en');
});

test('app/layout.tsx RootLayout renders with custom theme', async () => {
  process.env.THEME = 'Dark';
  process.env.THEME_OS = 'dark';
  process.env.FAVICON_URL = 'https://example.com/favicon.png';
  try {
    const module = await import('../../app/layout.tsx');
    const RootLayout = module.default;
    const result = await RootLayout({ children: React.createElement('div', null) });
    assert.ok(React.isValidElement(result));
    assert.strictEqual(result.props.className, 'dark');
    assert.ok(result.props.children !== undefined);
  } finally {
    delete process.env.THEME;
    delete process.env.THEME_OS;
    delete process.env.FAVICON_URL;
  }
});
