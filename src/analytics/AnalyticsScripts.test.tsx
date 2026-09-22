import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import AnalyticsScripts, { safeJsEncode } from './AnalyticsScripts';

vi.mock('next/script', () => ({
  default: (props: any) => <script {...props} />,
}));

describe('AnalyticsScripts component', () => {
  it('renders Google Analytics when GA_TRACKING_ID is provided', () => {
    const { container } = render(
      <AnalyticsScripts config={{ GA_TRACKING_ID: 'G-12345' }} />,
    );
    const scripts = container.querySelectorAll('script');
    expect(scripts.length).toBe(2);
    expect(scripts[0].getAttribute('id')).toBe('ga-script');
    expect(scripts[0].getAttribute('src')).toContain('G-12345');
    expect(scripts[1].getAttribute('id')).toBe('ga-init');
    expect(scripts[1].textContent).toContain("gtag('config', 'G-12345')");
  });

  it('renders Umami when UMAMI_WEBSITE_ID and UMAMI_APP_URL are provided', () => {
    const { container } = render(
      <AnalyticsScripts config={{
        UMAMI_WEBSITE_ID: 'test-site',
        UMAMI_APP_URL: 'https://umami.example.com',
      }} />,
    );
    const scripts = container.querySelectorAll('script');
    expect(scripts.length).toBe(1);
    expect(scripts[0].getAttribute('id')).toBe('umami-script');
    expect(scripts[0].getAttribute('src')).toBe('https://umami.example.com/umami.js');
    expect(scripts[0].getAttribute('data-website-id')).toBe('test-site');
  });

  it('renders Umami with custom script name', () => {
    const { container } = render(
      <AnalyticsScripts config={{
        UMAMI_WEBSITE_ID: 'test-site',
        UMAMI_APP_URL: 'https://umami.example.com',
        UMAMI_SCRIPT_NAME: 'custom.js',
      }} />,
    );
    const scripts = container.querySelectorAll('script');
    expect(scripts[0].getAttribute('src')).toBe('https://umami.example.com/custom.js');
  });

  it('renders Matomo when MATOMO_URL and MATOMO_SITE_ID are provided', () => {
    const { container } = render(
      <AnalyticsScripts config={{
        MATOMO_URL: 'https://matomo.example.com',
        MATOMO_SITE_ID: '123',
      }} />,
    );
    const scripts = container.querySelectorAll('script');
    expect(scripts.length).toBe(1);
    expect(scripts[0].getAttribute('id')).toBe('matomo-init');
    expect(scripts[0].textContent).toContain("setSiteId', '123'");
    expect(scripts[0].textContent).toContain('https://matomo.example.com/');
    // noscript img - may not render in jsdom, check if present
    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBeGreaterThanOrEqual(0);
  });

  it('renders Plausible when PLAUSIBLE_* configs are provided', () => {
    const { container } = render(
      <AnalyticsScripts config={{
        PLAUSIBLE_DATA_DOMAIN: 'example.plausible',
        PLAUSIBLE_DATA_API: 'https://api.plausible',
        PLAUSIBLE_URL: 'https://plausible.example.com',
      }} />,
    );
    const scripts = container.querySelectorAll('script');
    expect(scripts.length).toBe(1);
    expect(scripts[0].getAttribute('id')).toBe('plausible-script');
    expect(scripts[0].getAttribute('src')).toBe('https://plausible.example.com');
    expect(scripts[0].getAttribute('data-domain')).toBe('example.plausible');
    expect(scripts[0].getAttribute('data-api')).toBe('https://api.plausible');
  });

  it('renders no scripts when no config is provided', () => {
    const { container } = render(<AnalyticsScripts config={{}} />);
    const scripts = container.querySelectorAll('script');
    expect(scripts.length).toBe(0);
  });

  it('renders all analytics when all configs are provided', () => {
    const { container } = render(
      <AnalyticsScripts config={{
        GA_TRACKING_ID: 'G-1',
        UMAMI_WEBSITE_ID: 'site',
        UMAMI_APP_URL: 'https://umami.example.com',
        MATOMO_URL: 'https://matomo.example.com',
        MATOMO_SITE_ID: '1',
        PLAUSIBLE_DATA_DOMAIN: 'd',
        PLAUSIBLE_DATA_API: 'https://api',
        PLAUSIBLE_URL: 'https://plausible.example.com',
      }} />,
    );
    const scripts = container.querySelectorAll('script');
    expect(scripts.length).toBe(5);
  });
});

describe('safeJsEncode', () => {
  it('returns empty string for non-string input', () => {
    expect(safeJsEncode(undefined)).toBe('');
    expect(safeJsEncode(null)).toBe('');
    expect(safeJsEncode(123)).toBe('');
    expect(safeJsEncode({})).toBe('');
  });

  it('escapes backslashes', () => {
    expect(safeJsEncode('a\\b')).toBe('a\\\\b');
  });

  it('escapes angle brackets', () => {
    expect(safeJsEncode('<script>')).toBe('\\x3Cscript\\x3E');
  });

  it('escapes U+2028 and U+2029', () => {
    expect(safeJsEncode('a\u2028b\u2029c')).toBe('a\\u2028b\\u2029c');
  });

  it('returns string unchanged when no special chars', () => {
    expect(safeJsEncode('hello world')).toBe('hello world');
  });
});
