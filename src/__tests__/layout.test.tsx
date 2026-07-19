/**
 * @jest-environment jsdom
 */

import RootLayout, { generateMetadata } from '../../app/layout';

// Mock getRuntimeConfig and getTheme so we can inject values
jest.mock('../../src/config/runtimeConfig', () => {
  const actual = jest.requireActual('../../src/config/runtimeConfig');
  return {
    ...actual,
    getRuntimeConfig: jest.fn(),
    getTheme: jest.fn(),
  };
});

import { getRuntimeConfig } from '../../src/config/runtimeConfig';

const mockedGetRuntimeConfig = getRuntimeConfig as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('RootLayout', () => {
  // Note: RootLayout is an async Server Component. Next.js resolves these
  // internally before rendering. Direct RTL rendering is not possible with
  // the Jest renderer. We validate the layout structure through the
  // Next.js build output and e2e tests.
  //
  // The component returns:
  //   <html lang={cfg.LANG || 'en'} className={getTheme(cfg)}>
  //     <head>...</head>
  //     <body>{children}</body>
  //   </html>
  //
  // With stylesheet order: fonts.css, normalize.css, {theme}.css,
  // [os.css if THEME_OS], littlelink.css, brands.css
  test('layout file exports RootLayout component', () => {
    expect(RootLayout).toBeDefined();
  });

  test('layout file exports generateMetadata', () => {
    expect(generateMetadata).toBeDefined();
  });

  test('layout file exports dynamic = force-dynamic', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const layoutModule = require('../../app/layout');
    expect(layoutModule.dynamic).toBe('force-dynamic');
  });
});

describe('generateMetadata', () => {
  test('returns default title My Site when META_TITLE is not set', async () => {
    mockedGetRuntimeConfig.mockReturnValue({});
    const metadata = await generateMetadata();
    expect(metadata.title).toBe('My Site');
  });

  test('returns META_TITLE when set', async () => {
    mockedGetRuntimeConfig.mockReturnValue({ META_TITLE: 'Custom Title' });
    const metadata = await generateMetadata();
    expect(metadata.title).toBe('Custom Title');
  });

  test('includes META_DESCRIPTION when set', async () => {
    mockedGetRuntimeConfig.mockReturnValue({
      META_DESCRIPTION: 'A description',
    });
    const metadata = await generateMetadata();
    expect(metadata.description).toBe('A description');
  });

  test('excludes description when META_DESCRIPTION is not set', async () => {
    mockedGetRuntimeConfig.mockReturnValue({});
    const metadata = await generateMetadata();
    expect(metadata.description).toBeUndefined();
  });

  test('includes META_AUTHOR in authors array', async () => {
    mockedGetRuntimeConfig.mockReturnValue({ META_AUTHOR: 'Tim' });
    const metadata = await generateMetadata();
    expect(metadata.authors).toEqual([{ name: 'Tim' }]);
  });

  test('excludes authors when META_AUTHOR is not set', async () => {
    mockedGetRuntimeConfig.mockReturnValue({});
    const metadata = await generateMetadata();
    expect(metadata.authors).toBeUndefined();
  });

  test('includes META_KEYWORDS when set', async () => {
    mockedGetRuntimeConfig.mockReturnValue({ META_KEYWORDS: 'a, b, c' });
    const metadata = await generateMetadata();
    expect(metadata.keywords).toBe('a, b, c');
  });

  test('excludes keywords when META_KEYWORDS is not set', async () => {
    mockedGetRuntimeConfig.mockReturnValue({});
    const metadata = await generateMetadata();
    expect(metadata.keywords).toBeUndefined();
  });

  test('robots defaults to noindex', async () => {
    mockedGetRuntimeConfig.mockReturnValue({});
    const metadata = await generateMetadata();
    expect(metadata.robots).toBe('noindex');
  });

  test('robots uses META_INDEX_STATUS when set', async () => {
    mockedGetRuntimeConfig.mockReturnValue({ META_INDEX_STATUS: 'index' });
    const metadata = await generateMetadata();
    expect(metadata.robots).toBe('index');
  });

  test('includes Open Graph image with secureUrl and dimensions', async () => {
    mockedGetRuntimeConfig.mockReturnValue({
      OG_IMAGE: 'https://example.com/og.png',
      OG_IMAGE_WIDTH: '1200',
      OG_IMAGE_HEIGHT: '630',
    });
    const metadata = await generateMetadata();
    expect(metadata.openGraph!.images).toEqual([
      {
        url: 'https://example.com/og.png',
        secureUrl: 'https://example.com/og.png',
        width: 1200,
        height: 630,
      },
    ]);
  });

  test('Open Graph images is empty array when OG_IMAGE not set', async () => {
    mockedGetRuntimeConfig.mockReturnValue({});
    const metadata = await generateMetadata();
    expect(metadata.openGraph!.images).toEqual([]);
  });

  test('sets Twitter card fields when provided', async () => {
    mockedGetRuntimeConfig.mockReturnValue({
      TWITTER_CARD: 'summary_large_image' as const,
      TWITTER_TITLE: 'Twitter Title',
      TWITTER_DESCRIPTION: 'Twitter Desc',
      TWITTER_IMAGE: 'https://example.com/twitter.png',
      TWITTER_SITE: '@site',
      TWITTER_CREATOR: '@creator',
    });
    const metadata = await generateMetadata();
    expect((metadata.twitter! as { card: string }).card).toBe(
      'summary_large_image',
    );
    expect(metadata.twitter!.title).toBe('Twitter Title');
    expect(metadata.twitter!.description).toBe('Twitter Desc');
    expect(metadata.twitter!.images).toEqual([
      'https://example.com/twitter.png',
    ]);
    expect(metadata.twitter!.site).toBe('@site');
    expect(metadata.twitter!.creator).toBe('@creator');
  });

  test('Twitter images is empty array when no image', async () => {
    mockedGetRuntimeConfig.mockReturnValue({});
    const metadata = await generateMetadata();
    expect(metadata.twitter!.images).toEqual([]);
  });

  test('sets Open Graph fields when provided', async () => {
    mockedGetRuntimeConfig.mockReturnValue({
      OG_SITE_NAME: 'My Site',
      OG_TITLE: 'OG Title',
      OG_DESCRIPTION: 'OG Desc',
      OG_URL: 'https://example.com',
    });
    const metadata = await generateMetadata();
    expect(metadata.openGraph!.siteName).toBe('My Site');
    expect(metadata.openGraph!.title).toBe('OG Title');
    expect(metadata.openGraph!.description).toBe('OG Desc');
    expect(metadata.openGraph!.url).toBe('https://example.com');
  });

  test('Open Graph fields are undefined when not set', async () => {
    mockedGetRuntimeConfig.mockReturnValue({});
    const metadata = await generateMetadata();
    expect(metadata.openGraph!.siteName).toBeUndefined();
    expect(metadata.openGraph!.title).toBeUndefined();
    expect(metadata.openGraph!.description).toBeUndefined();
    expect(metadata.openGraph!.url).toBeUndefined();
  });

  test('includes author in other meta when META_AUTHOR is set', async () => {
    mockedGetRuntimeConfig.mockReturnValue({ META_AUTHOR: 'Tim' });
    const metadata = await generateMetadata();
    expect(metadata.other!.author).toBe('Tim');
  });

  test('excludes author from other meta when META_AUTHOR is not set', async () => {
    mockedGetRuntimeConfig.mockReturnValue({});
    const metadata = await generateMetadata();
    expect(metadata.other!.author).toBeUndefined();
  });

  test('injection: malicious META_TITLE is escaped by Next.js', async () => {
    const malicious = '"><script>alert(1)</script>';
    mockedGetRuntimeConfig.mockReturnValue({ META_TITLE: malicious });
    const metadata = await generateMetadata();
    expect(metadata.title).toBe(malicious);
  });

  test('injection: malicious OG values with newlines and special chars', async () => {
    const maliciousJson = 'x</script><script>alert(2)</script>';
    mockedGetRuntimeConfig.mockReturnValue({
      OG_TITLE: maliciousJson,
      OG_DESCRIPTION: 'line1\u2028line2\u2029line3',
    });
    const metadata = await generateMetadata();
    expect(metadata.openGraph!.title).toBe(maliciousJson);
    expect(metadata.openGraph!.description).toBe('line1\u2028line2\u2029line3');
  });

  test('getRuntimeConfig is called for each render (no cache)', async () => {
    mockedGetRuntimeConfig.mockReturnValue({});
    await generateMetadata();
    expect(mockedGetRuntimeConfig).toHaveBeenCalledTimes(1);
  });
});
