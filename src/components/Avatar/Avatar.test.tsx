import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';

describe('Avatar component', () => {
  it('renders with src prop', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
    const img = screen.getByAltText('User Avatar');
    expect(img.getAttribute('src')).toBe('https://example.com/avatar.jpg');
  });

  it('renders with srcSet prop', () => {
    render(
      <Avatar
        src="https://example.com/avatar.jpg"
        srcSet="https://example.com/avatar-2x.jpg 2x"
        alt="User Avatar"
      />,
    );
    const img = screen.getByAltText('User Avatar');
    expect(img.getAttribute('srcSet')).toBe(
      'https://example.com/avatar-2x.jpg 2x',
    );
  });

  it('applies drop-shadow class when configured', () => {
    render(
      <Avatar
        dropShadow="medium"
        src="https://example.com/avatar.jpg"
        alt="User"
      />,
    );
    const img = screen.getByAltText('User');
    expect(img.className).toContain('box-shadow-medium');
  });

  it('applies size inline style when configured', () => {
    render(
      <Avatar
        avatarSize="50px"
        src="https://example.com/avatar.jpg"
        alt="User"
      />,
    );
    const img = screen.getByAltText('User');
    expect(img.style.width).toBe('50px');
    expect(img.style.height).toBe('50px');
  });

  it('renders with alt text when alt prop provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
    const img = screen.getByAltText('User Avatar');
    expect(img).toBeInTheDocument();
  });

  it('renders img element without alt when no alt prop provided', () => {
    const { container } = render(
      <Avatar src="https://example.com/avatar.jpg" />,
    );
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });

  it('does not apply drop-shadow class when dropShadow is not configured', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
    const img = screen.getByAltText('User');
    expect(img.className).not.toContain('box-shadow-medium');
  });

  it('applies light drop-shadow class', () => {
    render(
      <Avatar dropShadow="light" src="https://example.com/avatar.jpg" alt="User" />,
    );
    const img = screen.getByAltText('User');
    expect(img.className).toContain('box-shadow-light');
  });

  it('applies heavy drop-shadow class', () => {
    render(
      <Avatar dropShadow="heavy" src="https://example.com/avatar.jpg" alt="User" />,
    );
    const img = screen.getByAltText('User');
    expect(img.className).toContain('box-shadow-heavy');
  });
});
