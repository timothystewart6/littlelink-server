import AnalyticsScripts, { safeJsEncode } from '../AnalyticsScripts';

describe('AnalyticsScripts', () => {
  test('component is defined and is a function', () => {
    expect(typeof AnalyticsScripts).toBe('function');
  });

  test('returns empty array when no analytics config is set', () => {
    const result = AnalyticsScripts({ config: {} });
    expect(result).toEqual([]);
  });

  test('returns Google Analytics elements when GA_TRACKING_ID is set', () => {
    const result = AnalyticsScripts({
      config: { GA_TRACKING_ID: 'G-XXXXXXXXXX' },
    });
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  test('returns Umami elements when UMAMI_WEBSITE_ID and UMAMI_APP_URL are set', () => {
    const result = AnalyticsScripts({
      config: {
        UMAMI_WEBSITE_ID: 'xxxx-xxxx',
        UMAMI_APP_URL: 'https://umami.example.com',
      },
    });
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  test('does not return Umami when only UMAMI_WEBSITE_ID is set', () => {
    const result = AnalyticsScripts({
      config: { UMAMI_WEBSITE_ID: 'xxxx-xxxx' },
    });
    expect(result).toEqual([]);
  });

  test('returns Matomo elements when MATOMO_URL and MATOMO_SITE_ID are set', () => {
    const result = AnalyticsScripts({
      config: {
        MATOMO_URL: 'https://matomo.example.com',
        MATOMO_SITE_ID: '42',
      },
    });
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  test('does not return Matomo when only MATOMO_URL is set', () => {
    const result = AnalyticsScripts({
      config: { MATOMO_URL: 'https://matomo.example.com' },
    });
    expect(result).toEqual([]);
  });

  test('returns Plausible elements when all three required fields are set', () => {
    const result = AnalyticsScripts({
      config: {
        PLAUSIBLE_DATA_DOMAIN: 'example.com',
        PLAUSIBLE_DATA_API: 'https://plausible.example.com/api/event',
        PLAUSIBLE_URL: 'https://plausible.example.com/js/script.js',
      },
    });
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  test('does not return Plausible when only PLAUSIBLE_DATA_DOMAIN is set', () => {
    const result = AnalyticsScripts({
      config: { PLAUSIBLE_DATA_DOMAIN: 'example.com' },
    });
    expect(result).toEqual([]);
  });

  test('returns all four providers simultaneously', () => {
    const config = {
      GA_TRACKING_ID: 'G-XXXX',
      UMAMI_WEBSITE_ID: 'xxxx',
      UMAMI_APP_URL: 'https://umami.example.com',
      MATOMO_URL: 'https://matomo.example.com',
      MATOMO_SITE_ID: '42',
      PLAUSIBLE_DATA_DOMAIN: 'example.com',
      PLAUSIBLE_DATA_API: 'https://plausible.example.com/api/event',
      PLAUSIBLE_URL: 'https://plausible.example.com/js/script.js',
    };
    const result = AnalyticsScripts({ config });
    // GA Fragment collapses to 1 element when rendered by Razzle jest,
    // Umami = 1, Matomo Fragment = 1, Plausible = 1
    expect(result.length).toBeGreaterThanOrEqual(4);
  });
});

describe('safeJsEncode', () => {
  test('encodes < and >', () => {
    const result = safeJsEncode('<script>alert(1)</script>');
    expect(result).toContain('\\x3Cscript\\x3E');
    expect(result).not.toContain('<');
  });

  test('encodes U+2028 and U+2029', () => {
    const result = safeJsEncode('foo\u2028bar\u2029baz');
    expect(result).toContain('\\u2028');
    expect(result).toContain('\\u2029');
    expect(result).not.toContain('\u2028');
    expect(result).not.toContain('\u2029');
  });

  test('encodes backslash', () => {
    const result = safeJsEncode('foo\\bar');
    expect(result).toContain('\\\\');
  });

  test('returns empty string for non-string input', () => {
    expect(safeJsEncode(undefined)).toBe('');
    expect(safeJsEncode(null)).toBe('');
    expect(safeJsEncode(42)).toBe('');
  });

  test('preserves normal text without changes', () => {
    expect(safeJsEncode('hello world')).toBe('hello world');
    expect(safeJsEncode('G-XXXXXXXXXX')).toBe('G-XXXXXXXXXX');
    expect(safeJsEncode('')).toBe('');
  });
});
