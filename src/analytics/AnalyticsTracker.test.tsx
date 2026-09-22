// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import AnalyticsTracker from './AnalyticsTracker';

describe('AnalyticsTracker component', () => {
  let paqPush: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.restoreAllMocks();
    // Mock globals
    Object.defineProperty(window, 'gtag', {
      writable: true,
      configurable: true,
      value: vi.fn(),
    });
    Object.defineProperty(window, 'umami', {
      writable: true,
      configurable: true,
      value: {
        track: vi.fn(),
      },
    });
    paqPush = vi.fn();
    // _paq must be an actual array for Array.isArray to pass
    const paq: any[] = [];
    paq.push = paqPush;
    Object.defineProperty(window, '_paq', {
      writable: true,
      configurable: true,
      value: paq,
    });
  });

  it('sets up click event listener', () => {
    const { container } = render(
      <AnalyticsTracker
        gaTrackingId="G-123"
        umamiWebsiteId="test-site"
        umamiAppUrl="https://umami.example.com"
        matomoSiteId="123"
        matomoUrl="https://matomo.example.com"
      />,
    );
    expect(container.querySelector('div')).toBeNull();
  });

  it('handles click on element with data-analytics-event', () => {
    const { container } = render(
      <AnalyticsTracker
        gaTrackingId="G-123"
        umamiWebsiteId="test-site"
        umamiAppUrl="https://umami.example.com"
        matomoSiteId="123"
        matomoUrl="https://matomo.example.com"
      />,
    );

    const link = document.createElement('a');
    link.setAttribute('data-analytics-event', 'test-event');
    link.textContent = 'Test';
    container.appendChild(link);

    link.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(window.gtag).toHaveBeenCalledWith('event', 'test-event');
    expect(window.umami?.track).toHaveBeenCalledWith('test-event');
    expect(paqPush).toHaveBeenCalledWith(['trackEvent', 'test-event']);
  });

  it('handles click when target is not an Element', () => {
    const { container } = render(
      <AnalyticsTracker
        gaTrackingId="G-123"
        umamiWebsiteId="test-site"
        umamiAppUrl="https://umami.example.com"
        matomoSiteId="123"
        matomoUrl="https://matomo.example.com"
      />,
    );

    container.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(window.gtag).not.toHaveBeenCalled();
    expect(window.umami?.track).not.toHaveBeenCalled();
    expect(paqPush).not.toHaveBeenCalled();
  });

  it('handles click when hasGoogle is false', () => {
    const { container } = render(
      <AnalyticsTracker
        umamiWebsiteId="test-site"
        umamiAppUrl="https://umami.example.com"
        matomoSiteId="123"
        matomoUrl="https://matomo.example.com"
      />,
    );

    const link = document.createElement('a');
    link.setAttribute('data-analytics-event', 'test-event');
    link.textContent = 'Test';
    container.appendChild(link);

    link.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(window.gtag).not.toHaveBeenCalled();
    expect(window.umami?.track).toHaveBeenCalledWith('test-event');
    expect(paqPush).toHaveBeenCalledWith(['trackEvent', 'test-event']);
  });

  it('handles click when hasUmami is false', () => {
    const { container } = render(
      <AnalyticsTracker
        gaTrackingId="G-123"
        matomoSiteId="123"
        matomoUrl="https://matomo.example.com"
      />,
    );

    const link = document.createElement('a');
    link.setAttribute('data-analytics-event', 'test-event');
    link.textContent = 'Test';
    container.appendChild(link);

    link.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(window.gtag).toHaveBeenCalledWith('event', 'test-event');
    expect(window.umami?.track).not.toHaveBeenCalled();
    expect(paqPush).toHaveBeenCalledWith(['trackEvent', 'test-event']);
  });

  it('handles click when hasMatomo is false', () => {
    const { container } = render(
      <AnalyticsTracker
        gaTrackingId="G-123"
        umamiWebsiteId="test-site"
        umamiAppUrl="https://umami.example.com"
      />,
    );

    const link = document.createElement('a');
    link.setAttribute('data-analytics-event', 'test-event');
    link.textContent = 'Test';
    container.appendChild(link);

    link.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(window.gtag).toHaveBeenCalledWith('event', 'test-event');
    expect(window.umami?.track).toHaveBeenCalledWith('test-event');
    expect(paqPush).not.toHaveBeenCalled();
  });

  it('handles click when target has no data-analytics-event attribute', () => {
    const { container } = render(
      <AnalyticsTracker
        gaTrackingId="G-123"
        umamiWebsiteId="test-site"
        umamiAppUrl="https://umami.example.com"
        matomoSiteId="123"
        matomoUrl="https://matomo.example.com"
      />,
    );

    const link = document.createElement('a');
    link.textContent = 'No Event';
    container.appendChild(link);

    link.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(window.gtag).not.toHaveBeenCalled();
    expect(window.umami?.track).not.toHaveBeenCalled();
    expect(paqPush).not.toHaveBeenCalled();
  });

  it('handles click when eventName is empty', () => {
    const { container } = render(
      <AnalyticsTracker
        gaTrackingId="G-123"
        umamiWebsiteId="test-site"
        umamiAppUrl="https://umami.example.com"
        matomoSiteId="123"
        matomoUrl="https://matomo.example.com"
      />,
    );

    const link = document.createElement('a');
    link.setAttribute('data-analytics-event', '');
    link.textContent = 'Empty Event';
    container.appendChild(link);

    link.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(window.gtag).not.toHaveBeenCalled();
    expect(window.umami?.track).not.toHaveBeenCalled();
    expect(paqPush).not.toHaveBeenCalled();
  });
});
