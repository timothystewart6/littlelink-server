import Avatar from '../Avatar';
import React from 'react';
import { render } from '@testing-library/react';

describe('<Avatar />', () => {
  test('renders with src and alt', () => {
    const { container } = render(
      <Avatar src="https://example.com/avatar.png" alt="My Avatar" />,
    );
    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toBe('https://example.com/avatar.png');
    expect(img?.getAttribute('alt')).toBe('My Avatar');
  });

  test('renders with srcSet', () => {
    const { container } = render(
      <Avatar
        src="https://example.com/avatar.png"
        srcSet="https://example.com/avatar@2x.png 2x"
        alt="Avatar"
      />,
    );
    const img = container.querySelector('img');
    expect(img?.getAttribute('srcset')).toBe(
      'https://example.com/avatar@2x.png 2x',
    );
  });

  test('applies avatarSize style when provided', () => {
    const { container } = render(
      <Avatar
        src="https://example.com/avatar.png"
        alt="Avatar"
        avatarSize="100px"
      />,
    );
    const img = container.querySelector('img');
    expect(img?.getAttribute('style')).toContain('width: 100px');
    expect(img?.getAttribute('style')).toContain('height: 100px');
  });

  test('no size style when avatarSize not provided', () => {
    const { container } = render(
      <Avatar src="https://example.com/avatar.png" alt="Avatar" />,
    );
    const img = container.querySelector('img');
    expect(img?.getAttribute('style')).toBeNull();
  });

  test('applies dropShadow class', () => {
    const { container } = render(
      <Avatar
        src="https://example.com/avatar.png"
        alt="Avatar"
        dropShadow="light"
      />,
    );
    const img = container.querySelector('img');
    expect(img?.getAttribute('class')).toContain('box-shadow-light');
  });
});
