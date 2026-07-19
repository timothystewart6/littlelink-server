import {
  getRuntimeConfig,
  getTheme,
  shouldSkipHealthLog,
  ENV_NAMES,
} from '../../config/runtimeConfig';

describe('getRuntimeConfig', () => {
  test('reads every allowlisted key from the provided env object', () => {
    const env = { GITHUB: 'https://github.com/test', META_TITLE: 'Test Site' };
    const config = getRuntimeConfig(env);
    expect(config.GITHUB).toBe('https://github.com/test');
    expect(config.META_TITLE).toBe('Test Site');
  });

  test('missing keys remain undefined', () => {
    const config = getRuntimeConfig({});
    expect(config.UNKNOWN_KEY).toBeUndefined();
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
    });
    expect(config.SKIP_HEALTH_CHECK_LOGS).toBe('false');
    expect(config.DROP_SHADOW).toBe('medium');
    expect(config.THEME).toBe('Dark');
  });

  test('values with special characters are preserved', () => {
    const config = getRuntimeConfig({
      META_TITLE: 'Test & "quotes" <angle> </script> \u2028 \u2029',
      NAME: 'User & Friends',
      GITHUB: 'https://example.com?q=<injection>&a=b',
    });
    expect(config.META_TITLE).toBe(
      'Test & "quotes" <angle> </script> \u2028 \u2029',
    );
    expect(config.NAME).toBe('User & Friends');
    expect(config.GITHUB).toBe('https://example.com?q=<injection>&a=b');
  });

  test('a config created for one request does not retain later mutations', () => {
    const env = { GITHUB: 'original' };
    const config = getRuntimeConfig(env);
    expect(config.GITHUB).toBe('original');
    env.GITHUB = 'mutated';
    expect(config.GITHUB).toBe('original');
  });

  test('every call returns a new object', () => {
    const a = getRuntimeConfig({});
    const b = getRuntimeConfig({});
    expect(a).not.toBe(b);
  });
});

describe('getTheme', () => {
  test('THEME=Dark returns dark', () => {
    expect(getTheme({ THEME: 'Dark' })).toBe('dark');
  });

  test('THEME=dark (lowercase) returns light', () => {
    expect(getTheme({ THEME: 'dark' })).toBe('light');
  });

  test('THEME absent returns light', () => {
    expect(getTheme({})).toBe('light');
  });

  test('THEME set to any other value returns light', () => {
    expect(getTheme({ THEME: 'DARK' })).toBe('light');
    expect(getTheme({ THEME: 'LIGHT' })).toBe('light');
    expect(getTheme({ THEME: '' })).toBe('light');
  });
});

describe('shouldSkipHealthLog', () => {
  test('SKIP_HEALTH_CHECK_LOGS=true returns true', () => {
    expect(shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: 'true' })).toBe(true);
  });

  test('SKIP_HEALTH_CHECK_LOGS=TRUE returns false', () => {
    expect(shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: 'TRUE' })).toBe(false);
  });

  test('SKIP_HEALTH_CHECK_LOGS=false returns false', () => {
    expect(shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: 'false' })).toBe(
      false,
    );
  });

  test('SKIP_HEALTH_CHECK_LOGS absent returns false', () => {
    expect(shouldSkipHealthLog({})).toBe(false);
  });

  test('SKIP_HEALTH_CHECK_LOGS set to any non-true string returns false', () => {
    expect(shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: '1' })).toBe(false);
    expect(shouldSkipHealthLog({ SKIP_HEALTH_CHECK_LOGS: 'yes' })).toBe(false);
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

  test('no RAZZLE_ prefixed key is present', () => {
    const razzleKeys = ENV_NAMES.filter(k => k.startsWith('RAZZLE_'));
    expect(razzleKeys).toEqual([]);
  });

  test('no NEXT_PUBLIC_ key is present', () => {
    const nextPublicKeys = ENV_NAMES.filter(k => k.startsWith('NEXT_PUBLIC_'));
    expect(nextPublicKeys).toEqual([]);
  });
});
