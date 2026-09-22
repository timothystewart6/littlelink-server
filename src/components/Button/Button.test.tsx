import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('renders with displayName', () => {
    render(<Button displayName="Click me" />);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('A');
  });

  it('renders with custom name prop', () => {
    render(<Button name="home" displayName="Home" />);
    const button = screen.getByText('Home');
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('button-home');
  });

  it('renders with href prop', () => {
    render(<Button href="https://example.com" displayName="Link" />);
    const button = screen.getByText('Link');
    expect(button.getAttribute('href')).toBe('https://example.com');
  });

  it('renders with icon prop', () => {
    render(<Button icon="fas arrow-right" displayName="Go" />);
    const button = screen.getByText('Go');
    expect(button).toBeInTheDocument();
  });

  it('applies drop-shadow class when configured', () => {
    render(<Button dropShadow="medium" displayName="Shadow" />);
    const button = screen.getByText('Shadow');
    expect(button.className).toContain('box-shadow-medium');
  });

  it('applies custom class when styles prop provided', () => {
    const styles = { color: 'red' };
    render(<Button styles={styles} displayName="Styled" />);
    const button = screen.getByText('Styled');
    expect(button.className).toContain('button');
  });

  it('renders anchor element without displayName when no text provided', () => {
    const { container } = render(<Button />);
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
  });

  it('applies noopener noreferrer rel when href provided', () => {
    render(<Button href="https://example.com" displayName="Link" />);
    const link = screen.getByText('Link');
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(link.getAttribute('rel')).toContain('noreferrer');
  });

  it('applies noopener noreferrer rel by default', () => {
    render(<Button displayName="Click" />);
    const link = screen.getByText('Click');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('applies light drop-shadow class when dropShadow is light', () => {
    render(<Button dropShadow="light" displayName="Shadow" />);
    const button = screen.getByText('Shadow');
    expect(button.className).toContain('box-shadow-light');
  });

  it('applies heavy drop-shadow class when dropShadow is heavy', () => {
    render(<Button dropShadow="heavy" displayName="Shadow" />);
    const button = screen.getByText('Shadow');
    expect(button.className).toContain('box-shadow-heavy');
  });
});
