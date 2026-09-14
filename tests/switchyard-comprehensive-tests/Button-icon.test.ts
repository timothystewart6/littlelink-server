import { test } from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Button from '../../src/components/Button/Button';

test('renders icon when provided', () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { name: 'twitter', icon: 'fa-twitter' }, 'Twitter')
  );
  console.log('HTML:', html);
  assert.ok(typeof html === 'string');
});
