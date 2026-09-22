import { describe, it, expect, vi } from 'vitest';
import { trackGoogleEvent } from './google';

describe('trackGoogleEvent', () => {
  it('calls window.gtag with event action when gtag is available', () => {
    const gtag = vi.fn();
    (window as any).gtag = gtag;
    trackGoogleEvent('test_action');
    expect(gtag).toHaveBeenCalledWith('event', 'test_action');
  });

  it('does not throw when window.gtag is undefined', () => {
    (window as any).gtag = undefined;
    expect(() => trackGoogleEvent('test_action')).not.toThrow();
  });
});