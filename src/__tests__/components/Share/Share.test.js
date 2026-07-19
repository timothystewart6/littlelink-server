import Share from '../../../components/Share/Share';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

describe('<Share />', () => {
  test('renders the share button', () => {
    const { container } = render(
      <Share url="https://example.com" title="Test" text="Desc" />,
    );
    const link = container.querySelector('a');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  test('calls navigator.share when clicked', () => {
    const mockShare = jest.fn(() => Promise.resolve());
    Object.assign(navigator, { share: mockShare });

    const { container } = render(
      <Share url="https://example.com" title="Test Title" text="Test text" />,
    );
    const link = container.querySelector('a');
    fireEvent.click(link);
    expect(mockShare).toHaveBeenCalledWith({
      url: 'https://example.com',
      title: 'Test Title',
      text: 'Test text',
    });
  });

  test('handles navigator.share rejection without throwing', () => {
    const mockShare = jest.fn(() => Promise.reject(new Error('AbortError')));
    Object.assign(navigator, { share: mockShare });

    const { container } = render(
      <Share url="https://example.com" title="Test" text="Desc" />,
    );
    const link = container.querySelector('a');
    // This should not throw
    fireEvent.click(link);
  });

  test('does nothing when navigator.share is not available', () => {
    Object.assign(navigator, { share: undefined });

    const { container } = render(
      <Share url="https://example.com" title="Test" text="Desc" />,
    );
    const link = container.querySelector('a');
    fireEvent.click(link);
    // No error should be thrown
  });
});
