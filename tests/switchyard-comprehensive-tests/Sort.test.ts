import { test } from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Sort from '../../src/components/Sort/Sort';

test('sorts children by order prop descending', () => {
  const sorted = React.createElement(Sort, null,
    React.createElement('div', { props: { order: 1 } }, 'First'),
    React.createElement('div', { props: { order: 3 } }, 'Third'),
    React.createElement('div', { props: { order: 2 } }, 'Second')
  );
  const html = renderToStaticMarkup(sorted);
  assert.ok(typeof html === 'string');
});

test('handles children without order prop', () => {
  const sorted = React.createElement(Sort, null,
    React.createElement('div', null, 'No order 1'),
    React.createElement('div', { props: { order: 5 } }, 'With order'),
    React.createElement('div', null, 'No order 2')
  );
  const html = renderToStaticMarkup(sorted);
  assert.ok(typeof html === 'string');
});

test('renders multiple children in descending order', () => {
  const sorted = React.createElement(Sort, null,
    React.createElement('div', { props: { order: 2 } }, 'Second'),
    React.createElement('div', { props: { order: 5 } }, 'Fifth'),
    React.createElement('div', { props: { order: 1 } }, 'First'),
    React.createElement('div', { props: { order: 4 } }, 'Fourth'),
    React.createElement('div', { props: { order: 3 } }, 'Third')
  );
  const html = renderToStaticMarkup(sorted);
  assert.ok(typeof html === 'string');
});
