import { test } from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Button from '../../src/components/Button/Button';

test('renders Button with default props', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'test', href: 'https://example.com' }, 'Test Button')
  );
  assert.ok(typeof html === 'string');
  assert.ok(html.length > 0);
});

test('applies dropShadow light class', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'test', dropShadow: 'light' }, 'Test')
  );
  assert.ok(html.includes('box-shadow-light'));
});

test('applies dropShadow medium class', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'test', dropShadow: 'medium' }, 'Test')
  );
  assert.ok(html.includes('box-shadow-medium'));
});

test('applies dropShadow heavy class', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'test', dropShadow: 'heavy' }, 'Test')
  );
  assert.ok(html.includes('box-shadow-heavy'));
});

test('does not apply shadow class when dropShadow is undefined', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'test' }, 'Test')
  );
  assert.ok(!html.includes('box-shadow'));
});

test('applies default button CSS class', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'default' }, 'Default')
  );
  assert.ok(html.includes('button button-default'));
});

test('applies named button CSS class', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'twitter' }, 'Twitter')
  );
  assert.ok(html.includes('button button-twitter'));
});

test('renders logo when provided', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'twitter', logo: '/icons/twitter.svg' }, 'Twitter')
  );
  assert.ok(html.includes('icon') && html.includes('twitter.svg'));
});

test('renders displayName when provided', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'test', displayName: 'Custom Name' }, 'Test Button')
  );
  assert.ok(html.includes('Custom Name'));
});

test('applies rel attribute', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'test', href: 'https://example.com' }, 'Test')
  );
  assert.ok(html.includes('rel='));
});

test('applies target _blank by default', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'test', href: 'https://example.com' }, 'Test')
  );
  assert.ok(html.includes('target='));
});

test('applies custom styles', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'test', styles: { color: 'red' } }, 'Test')
  );
  assert.ok(html.includes('style='));
});

test('applies buttonTarget _self', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'test', href: 'https://example.com', buttonTarget: '_self' }, 'Test')
  );
  assert.ok(html.includes('_self'));
});

test('applies custom rels nofollow', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'test', href: 'https://example.com', rels: 'nofollow' }, 'Test')
  );
  assert.ok(html.includes('nofollow'));
});
