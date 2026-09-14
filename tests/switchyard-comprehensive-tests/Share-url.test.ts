import { test } from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Share from '../../src/components/Share/Share';

test('renders Share with default props', () => {
  const html = renderToStaticMarkup(
    React.createElement(Share, { url: 'https://example.com', title: 'Test Title' })
  );
  assert.ok(typeof html === 'string');
  assert.ok(html.length > 0);
});

test('renders Share anchor tag', () => {
  const html = renderToStaticMarkup(
    React.createElement(Share, { url: 'https://example.com', title: 'Test Title' })
  );
  assert.ok(html.includes('a'));
});

test('renders Share with rel attribute', () => {
  const html = renderToStaticMarkup(
    React.createElement(Share, { url: 'https://example.com', title: 'Test Title' })
  );
  assert.ok(html.includes('rel='));
});

test('renders Share with nofollow attributes', () => {
  const html = renderToStaticMarkup(
    React.createElement(Share, { url: 'https://example.com', title: 'Test Title' })
  );
  assert.ok(html.includes('noopener') && html.includes('noreferrer'));
});

test('renders Share with FontAwesome icon', () => {
  const html = renderToStaticMarkup(
    React.createElement(Share, { url: 'https://example.com', title: 'Test Title' })
  );
  assert.ok(html.includes('<i') && html.includes('fa'));
});
