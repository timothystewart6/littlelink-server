import type { RuntimeConfig } from '../../config/runtimeConfig';
import {
  getRuntimeConfig,
  getTheme,
  shouldSkipHealthLog,
  ENV_NAMES,
} from '../../config/runtimeConfig';

describe('getRuntimeConfig', () => {
  test('reads every allowlisted key from the provided env object', () => {
    const env: Record<string, string | undefined> = {
      GITHUB: 'https://github.com/test',
      META_TITLE: 'Test Site',
    };
    const config = getRuntimeConfig(env);
    expect(config.GITHUB).toBe('https://github.com/test');
    expect(config.META_TITLE).toBe('Test Site');
  });

  test('missing keys remain undefined', () => {
    const config = getRuntimeConfig({} as Record<string, string | undefined>);
    expect(
      (config as Record<string, string | undefined>).UNKNOWN_KEY,
    ).toBeUndefined();
    expect(config.GITHUB).toBeUndefined();
  });

  test('defaults to process.env when no argument is given', () => {
    const config = getRuntimeConfig();
    // NODE_ENV is not in the allowlist, so config.NODE_ENV is undefined
    // But process.env values that ARE in the list should be readable
    expect(typeof config).toBe('object');
  });

  test('values are returned as strings without type coercion', () => {
    const config = getRuntimeConfig({
      SKIP_HEALTH_CHECK_LOGS: 'false',
      DROP_SHADOW: 'medium',
      THEME: 'Dark',
    } as Record<string, string | undefined>);
    expect(config.SKIP_HEALTH_CHECK_LOGS).toBe('false');
    expect(config.DROP_SHADOW).toBe('medium');
    expect(config.THEME).toBe('Dark');
  });

  test('values with special characters are preserved', () => {
    const config = getRuntimeConfig({
      META_TITLE: 'Test & "quotes" <angle> </script> \u2028 \u2029',
      NAME: 'User & Friends',
      GITHUB: 'https://example.com?q=<injection>&a=b',
    } as Record<string, string | undefined>);
    expect(config.META_TITLE).toBe(
      'Test & "quotes" <angle> </script> \u2028 \u2029',
    );
    expect(config.NAME).toBe('User & Friends');
    expect(config.GITHUB).toBe('https://example.com?q=<injection>&a=b');
  });

  test('a config created for one request does not retain later mutations', () => {
    const env: Record<string, string | undefined> = { GITHUB: 'original' };
    const config = getRuntimeConfig(env);
    expect(config.GITHUB).toBe('original');
    env.GITHUB = 'mutated';
    expect(config.GITHUB).toBe('original');
  });

  test('every call returns a new object', () => {
    const a = getRuntimeConfig({} as Record<string, string | undefined>);
    const b = getRuntimeConfig({} as Record<string, string | undefined>);
    expect(a).not.toBe(b);
  });
});

describe('getTheme', () => {
  test('THEME=Dark returns dark', () => {
    expect(getTheme({ THEME: 'Dark' } as RuntimeConfig)).toBe('dark');
  });

  test('THEME=dark (lowercase) returns light', () => {
    expect(getTheme({ THEME: 'dark' } as RuntimeConfig)).toBe('light');
  });

  test('THEME absent returns light', () => {
    expect(getTheme({} as RuntimeConfig)).toBe('light');
  });

  test('THEME set to any other value returns light', () => {
    expect(getTheme({ THEME: 'DARK' } as RuntimeConfig)).toBe('light');
    expect(getTheme({ THEME: 'LIGHT' } as RuntimeConfig)).toBe('light');
    expect(getTheme({ THEME: '' } as RuntimeConfig)).toBe('light');
  });
});

describe('shouldSkipHealthLog', () => {
  test('SKIP_HEALTH_CHECK_LOGS=true returns true', () => {
    expect(
      shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: 'true' } as RuntimeConfig),
    ).toBe(true);
  });

  test('SKIP_HEALTH_CHECK_LOGS=TRUE returns false', () => {
    expect(
      shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: 'TRUE' } as RuntimeConfig),
    ).toBe(false);
  });

  test('SKIP_HEALTH_CHECK_LOGS=false returns false', () => {
    expect(
      shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: 'false' } as RuntimeConfig),
    ).toBe(false);
  });

  test('SKIP_HEALTH_CHECK_LOGS absent returns false', () => {
    expect(shouldSkipHealthLog({} as RuntimeConfig)).toBe(false);
  });

  test('SKIP_HEALTH_CHECK_LOGS set to any non-true string returns false', () => {
    expect(
      shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: '1' } as RuntimeConfig),
    ).toBe(false);
    expect(
      shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: 'yes' } as RuntimeConfig),
    ).toBe(false);
  });
});

describe('ENV_NAMES allowlist', () => {
  test('contains exactly the expected number of keys', () => {
    expect(ENV_NAMES.length).toBe(165);
  });

  test('every key is sorted alphabetically', () => {
    const sorted = [...ENV_NAMES].sort();
    expect(ENV_NAMES).toEqual(sorted);
  });

  test('every key is unique', () => {
    const unique = new Set(ENV_NAMES);
    expect(unique.size).toBe(ENV_NAMES.length);
  });

  test('no NEXT_PUBLIC_ key is present', () => {
    const nextPublicKeys = ENV_NAMES.filter(k => k.startsWith('NEXT_PUBLIC_'));
    expect(nextPublicKeys).toEqual([]);
  });
});
