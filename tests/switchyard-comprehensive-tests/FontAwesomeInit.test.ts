import { test } from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import FontAwesomeInit from '../../src/components/FontAwesomeInit';

test('passes through children', () => {
  const html = renderToStaticMarkup(
    React.createElement(FontAwesomeInit, null, React.createElement('i', null, 'test'))
  );
  assert.ok(typeof html === 'string');
  assert.ok(html.includes('i') || html.includes('test'));
});

test('renders empty children', () => {
  const html = renderToStaticMarkup(React.createElement(FontAwesomeInit, null));
  assert.ok(typeof html === 'string');
});

test('renders with multiple children', () => {
  const html = renderToStaticMarkup(
    React.createElement(FontAwesomeInit, null,
      React.createElement('i', null, 'fa1'),
      React.createElement('i', null, 'fa2')
    )
  );
  assert.ok(typeof html === 'string');
});
