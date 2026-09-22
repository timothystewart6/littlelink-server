import { describe, it, expect, vi } from 'vitest';
import { trackUmamiEvent } from './umami';

describe('trackUmamiEvent', () => {
  it('calls window.umami.track when umami is available', () => {
    const track = vi.fn();
    (window as any).umami = { track };
    trackUmamiEvent('test_event');
    expect(track).toHaveBeenCalledWith('test_event');
  });

  it('does not throw when window.umami is undefined', () => {
    (window as any).umami = undefined;
    expect(() => trackUmamiEvent('test_event')).not.toThrow();
  });
});