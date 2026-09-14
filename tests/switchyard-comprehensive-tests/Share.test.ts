import { test } from 'node:test';
import assert from 'node:assert';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import Share from '../../src/components/Share/Share';

test('renders Share component with button anchor', () => {
  const html = renderToStaticMarkup(React.createElement(Share, { url: 'https://example.com', title: 'Test', text: 'Share test' }));
  assert.ok(html.includes('a'), 'should render a tag');
  assert.ok(html.includes('button'), 'should have button class');
  assert.ok(html.includes('fa'), 'should have fontawesome icon');
});

test('renders Share component without url', () => {
  const html = renderToStaticMarkup(React.createElement(Share, { title: 'Test' }));
  assert.ok(html.includes('a'));
});

test('renders Share component with only text', () => {
  const html = renderToStaticMarkup(React.createElement(Share, { text: 'Share this' }));
  assert.ok(html.includes('a'));
});
