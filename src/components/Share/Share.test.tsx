import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import Share from './Share';

describe('Share component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    // Default: navigator.share is not available
    Object.defineProperty(navigator, 'share', {
      writable: true,
      configurable: true,
      value: undefined,
    });
  });

  it('renders anchor element with button class', () => {
    const { container } = render(
      <Share url="https://example.com" title="Test Title" />
    );
    const anchor = container.querySelector('a');
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveClass('button');
  });

  it('renders with rel attribute', () => {
    const { container } = render(
      <Share url="https://example.com" title="Test Title" />
    );
    const anchor = container.querySelector('a');
    expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders anchor element with rel even when no url provided', () => {
    const { container } = render(<Share />);
    const anchor = container.querySelector('a');
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('calls navigator.share when url is provided and share is available', async () => {
    const shareMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', {
      writable: true,
      configurable: true,
      value: shareMock,
    });

    const { container } = render(
      <Share url="https://example.com" title="Test Title" text="Some text" />
    );

    const anchor = container.querySelector('a');
    await userEvent.click(anchor!);

    expect(shareMock).toHaveBeenCalledTimes(1);
    expect(shareMock).toHaveBeenCalledWith({
      url: 'https://example.com',
      title: 'Test Title',
      text: 'Some text',
    });
  });

  it('calls navigator.share with undefined url when url is not provided', async () => {
    const shareMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', {
      writable: true,
      configurable: true,
      value: shareMock,
    });

    const { container } = render(<Share />);

    const anchor = container.querySelector('a');
    await userEvent.click(anchor!);

    expect(shareMock).toHaveBeenCalledTimes(1);
    expect(shareMock).toHaveBeenCalledWith({
      url: undefined,
      title: undefined,
      text: undefined,
    });
  });

  it('does not call navigator.share when share is not available', async () => {
    const { container } = render(
      <Share url="https://example.com" title="Test Title" />
    );

    const anchor = container.querySelector('a');
    await userEvent.click(anchor!);

    // navigator.share is undefined, so nothing should be called
    expect(navigator.share).toBeUndefined();
  });

  it('handles navigator.share rejection gracefully', async () => {
    const shareMock = vi.fn().mockRejectedValue(new Error('User cancelled'));
    Object.defineProperty(navigator, 'share', {
      writable: true,
      configurable: true,
      value: shareMock,
    });

    const { container } = render(
      <Share url="https://example.com" title="Test Title" />
    );

    const anchor = container.querySelector('a');
    await userEvent.click(anchor!);

    expect(shareMock).toHaveBeenCalledTimes(1);
  });
});
