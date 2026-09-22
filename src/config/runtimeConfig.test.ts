import { describe, it, expect } from 'vitest';
import {
  getRuntimeConfig,
  getTheme,
  shouldSkipHealthLog,
} from './runtimeConfig';

describe('getRuntimeConfig', () => {
  it('returns config from process.env when no env provided', () => {
    const env = process.env as Record<string, string | undefined>;
    const config = getRuntimeConfig(env);
    expect(config).toBeDefined();
    expect(Object.keys(config).length).toBeGreaterThan(0);
  });

  it('returns config from provided env object', () => {
    const config = getRuntimeConfig({
      THEME: 'Dark',
      META_TITLE: 'Test',
    });
    expect(config.THEME).toBe('Dark');
    expect(config.META_TITLE).toBe('Test');
  });

  it('returns config from undefined env', () => {
    const config = getRuntimeConfig(undefined as any);
    expect(config).toBeDefined();
    expect(Object.keys(config).length).toBeGreaterThan(0);
  });
});

describe('getTheme', () => {
  it('returns dark when THEME is Dark', () => {
    const config = getRuntimeConfig({ THEME: 'Dark' });
    expect(getTheme(config)).toBe('dark');
  });

  it('returns light when THEME is not Dark', () => {
    const config = getRuntimeConfig({ THEME: 'light' });
    expect(getTheme(config)).toBe('light');

    const config2 = getRuntimeConfig({ THEME: 'dark' });
    expect(getTheme(config2)).toBe('light');
  });

  it('returns light when THEME is undefined', () => {
    const config = getRuntimeConfig({});
    expect(getTheme(config)).toBe('light');
  });
});

describe('shouldSkipHealthLog', () => {
  it('returns true when SKIP_HEALTH_CHECK_LOGS is true', () => {
    const config = getRuntimeConfig({ SKIP_HEALTH_CHECK_LOGS: 'true' });
    expect(shouldSkipHealthLog(config)).toBe(true);
  });

  it('returns false when SKIP_HEALTH_CHECK_LOGS is not true', () => {
    const config = getRuntimeConfig({ SKIP_HEALTH_CHECK_LOGS: 'false' });
    expect(shouldSkipHealthLog(config)).toBe(false);

    const config2 = getRuntimeConfig({ SKIP_HEALTH_CHECK_LOGS: 'TRUE' });
    expect(shouldSkipHealthLog(config2)).toBe(false);

    const config3 = getRuntimeConfig({});
    expect(shouldSkipHealthLog(config3)).toBe(false);
  });

  it('returns false when SKIP_HEALTH_CHECK_LOGS is empty string', () => {
    const config = getRuntimeConfig({ SKIP_HEALTH_CHECK_LOGS: '' } as Record<
      string,
      string | undefined
    >);
    expect(shouldSkipHealthLog(config)).toBe(false);
  });

  it('returns false when SKIP_HEALTH_CHECK_LOGS is any truthy value other than true', () => {
    expect(
      shouldSkipHealthLog(
        getRuntimeConfig({ SKIP_HEALTH_CHECK_LOGS: 'yes' } as Record<
          string,
          string | undefined
        >),
      ),
    ).toBe(false);
    expect(
      shouldSkipHealthLog(
        getRuntimeConfig({ SKIP_HEALTH_CHECK_LOGS: '1' } as Record<
          string,
          string | undefined
        >),
      ),
    ).toBe(false);
    expect(
      shouldSkipHealthLog(
        getRuntimeConfig({ SKIP_HEALTH_CHECK_LOGS: 'TRUE' } as Record<
          string,
          string | undefined
        >),
      ),
    ).toBe(false);
    expect(
      shouldSkipHealthLog(
        getRuntimeConfig({ SKIP_HEALTH_CHECK_LOGS: 'on' } as Record<
          string,
          string | undefined
        >),
      ),
    ).toBe(false);
  });
});
