import { test } from 'node:test';
import assert from 'node:assert';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import Button from '../../src/components/Button/Button';
import { DropShadow } from '../../src/config/runtimeConfig';

test('renders button with name and no drop shadow', () => {
  const html = renderToStaticMarkup(React.createElement(Button, { name: 'test', href: 'https://example.com' }));
  assert.ok(html.includes('button'));
});

test('renders button with medium drop shadow', () => {
  const html = renderToStaticMarkup(React.createElement(Button, { name: 'test', href: 'https://example.com', dropShadow: 'medium' }));
  assert.ok(html.includes('box-shadow-medium'));
});

test('renders button with heavy drop shadow', () => {
  const html = renderToStaticMarkup(React.createElement(Button, { name: 'test', href: 'https://example.com', dropShadow: 'heavy' }));
  assert.ok(html.includes('box-shadow-heavy'));
});

test('renders button with light drop shadow', () => {
  const html = renderToStaticMarkup(React.createElement(Button, { name: 'test', href: 'https://example.com', dropShadow: 'light' }));
  assert.ok(html.includes('box-shadow-light'));
});
