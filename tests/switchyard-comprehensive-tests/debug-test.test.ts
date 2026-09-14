import { test } from 'node:test';
import assert from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import Home from '../../src/components/Home/Home';

test('debug FACEBOOK_MESSENGER', () => {
  const html = renderToStaticMarkup(React.createElement(Home, { config: { FACEBOOK_MESSENGER: 'https://messenger.com', NAME: 'Test', BIO: 'Bio' } }));
  console.log('HTML length:', html.length);
  console.log('HTML includes messenger:', html.includes('messenger'));
  console.log('HTML includes Messenger:', html.includes('Messenger'));
  console.log('HTML includes FACEBOOK_MESSENGER:', html.includes('FACEBOOK_MESSENGER'));
  console.log('HTML includes button:', html.includes('button'));
  console.log('HTML includes div:', html.includes('div'));
  // Print first 200 chars
  console.log('First 200 chars:', html.substring(0, 200));
});
