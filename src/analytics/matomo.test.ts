// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import { trackMatomoEvent } from './matomo';

describe('trackMatomoEvent', () => {
  it('pushes trackEvent to _paq when _paq is available', () => {
    const paq = [];
    (window as any)._paq = paq;
    trackMatomoEvent('test_event');
    expect(paq).toEqual([['trackEvent', 'test_event']]);
  });

  it('does not throw when window._paq is undefined', () => {
    (window as any)._paq = undefined;
    expect(() => trackMatomoEvent('test_event')).not.toThrow();
  });
});