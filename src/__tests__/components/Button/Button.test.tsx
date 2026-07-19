import Button from '../../../components/Button/Button';
import React from 'react';
import { render } from '@testing-library/react';

describe('<Button />', () => {
  test('renders with required props', () => {
    const { container } = render(
      <Button
        name="youtube"
        href="https://youtube.com"
        displayName="YouTube"
      />,
    );
    const link = container.querySelector('a');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe('https://youtube.com');
    expect(link?.textContent).toContain('YouTube');
  });

  test('renders with logo', () => {
    const { container } = render(
      <Button
        name="github"
        href="https://github.com"
        displayName="GitHub"
        logo="/icons/github.svg"
      />,
    );
    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toBe('/icons/github.svg');
    expect(img?.getAttribute('alt')).toBe('GitHub logo');
  });

  test('renders with custom styles', () => {
    const { container } = render(
      <Button
        name="custom"
        href="https://example.com"
        displayName="Custom"
        styles={{ backgroundColor: 'red', color: 'white' }}
      />,
    );
    const link = container.querySelector('a');
    expect(link?.getAttribute('style')).toContain('background-color: red');
    expect(link?.getAttribute('style')).toContain('color: white');
  });

  test('uses custom buttonTarget', () => {
    const { container } = render(
      <Button
        name="test"
        href="https://example.com"
        displayName="Test"
        buttonTarget="_self"
      />,
    );
    const link = container.querySelector('a');
    expect(link?.getAttribute('target')).toBe('_self');
  });

  test('defaults buttonTarget to _blank', () => {
    const { container } = render(
      <Button name="test" href="https://example.com" displayName="Test" />,
    );
    const link = container.querySelector('a');
    expect(link?.getAttribute('target')).toBe('_blank');
  });

  test('adds data-analytics-event attribute', () => {
    const { container } = render(
      <Button
        name="youtube"
        href="https://youtube.com"
        displayName="YouTube"
      />,
    );
    const link = container.querySelector('a');
    expect(link?.getAttribute('data-analytics-event')).toBe('youtube-button');
  });

  test('applies drop-shadow class based on dropShadow prop', () => {
    const { container } = render(
      <Button
        name="test"
        href="https://example.com"
        displayName="Test"
        dropShadow="medium"
      />,
    );
    const link = container.querySelector('a');
    expect(link?.getAttribute('class')).toContain('box-shadow-medium');
  });

  test('uses rel attribute from rels prop', () => {
    const { container } = render(
      <Button
        name="mastodon"
        href="https://mastodon.social/@test"
        displayName="Mastodon"
        rels="me noopener noreferrer"
      />,
    );
    const link = container.querySelector('a');
    expect(link?.getAttribute('rel')).toBe('me noopener noreferrer');
  });

  test('defaults rel to noopener noreferrer', () => {
    const { container } = render(
      <Button name="test" href="https://example.com" displayName="Test" />,
    );
    const link = container.querySelector('a');
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
  });
});
