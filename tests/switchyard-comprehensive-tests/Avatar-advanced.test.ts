import { test } from 'node:test';
import assert from 'node:assert';
import Avatar from '../../src/components/Avatar/Avatar';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

test('renders Avatar with src prop', () => {
  const html = renderToStaticMarkup(
    React.createElement(Avatar, { src: 'https://example.com/avatar.jpg', alt: 'User Avatar' })
  );
  assert.ok(typeof html === 'string');
  assert.ok(html.includes('src='));
});

test('renders Avatar with srcSet prop', () => {
  const html = renderToStaticMarkup(
    React.createElement(Avatar, { 
      src: 'https://example.com/avatar.jpg', 
      srcSet: 'https://example.com/avatar-2x.jpg 2x',
      alt: 'User Avatar' 
    })
  );
  assert.ok(typeof html === 'string');
  assert.ok(html.includes('srcSet='));
});

test('applies dropShadow light class', () => {
  const html = renderToStaticMarkup(
    React.createElement(Avatar, { src: 'https://example.com/avatar.jpg', dropShadow: 'light' })
  );
  assert.ok(html.includes('box-shadow-light'));
});

test('applies dropShadow medium class', () => {
  const html = renderToStaticMarkup(
    React.createElement(Avatar, { src: 'https://example.com/avatar.jpg', dropShadow: 'medium' })
  );
  assert.ok(html.includes('box-shadow-medium'));
});

test('applies dropShadow heavy class', () => {
  const html = renderToStaticMarkup(
    React.createElement(Avatar, { src: 'https://example.com/avatar.jpg', dropShadow: 'heavy' })
  );
  assert.ok(html.includes('box-shadow-heavy'));
});

test('does not apply shadow class when dropShadow is undefined', () => {
  const html = renderToStaticMarkup(
    React.createElement(Avatar, { src: 'https://example.com/avatar.jpg' })
  );
  assert.ok(!html.includes('box-shadow'));
});

test('applies dropShadow with avatar size', () => {
  const html = renderToStaticMarkup(
    React.createElement(Avatar, { src: 'https://example.com/avatar.jpg', avatarSize: 'large', dropShadow: 'medium' })
  );
  assert.ok(html.includes('width') || html.includes('height'));
});
