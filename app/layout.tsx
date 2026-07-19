/* eslint-disable @next/next/no-css-tags */
import React from 'react';
import type { Metadata } from 'next';
import { getRuntimeConfig, getTheme } from '../src/config/runtimeConfig';
import AnalyticsScripts from '../src/analytics/AnalyticsScripts';
import FontAwesomeInit from '../src/components/FontAwesomeInit';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cfg = getRuntimeConfig();

  const title = cfg.META_TITLE || 'My Site';
  const description = cfg.META_DESCRIPTION;
  const author = cfg.META_AUTHOR;
  const keywords = cfg.META_KEYWORDS;

  return {
    title,
    description: description || undefined,
    authors: author ? [{ name: author }] : undefined,
    keywords: keywords || undefined,
    robots: cfg.META_INDEX_STATUS || 'noindex',
    openGraph: {
      title: cfg.OG_TITLE || undefined,
      description: cfg.OG_DESCRIPTION || undefined,
      siteName: cfg.OG_SITE_NAME || undefined,
      url: cfg.OG_URL || undefined,
      images: cfg.OG_IMAGE
        ? [
            {
              url: cfg.OG_IMAGE,
              secureUrl: cfg.OG_IMAGE,
              width: cfg.OG_IMAGE_WIDTH
                ? parseInt(cfg.OG_IMAGE_WIDTH, 10)
                : undefined,
              height: cfg.OG_IMAGE_HEIGHT
                ? parseInt(cfg.OG_IMAGE_HEIGHT, 10)
                : undefined,
            },
          ]
        : [],
    },
    twitter: {
      card:
        (cfg.TWITTER_CARD as
          'summary' | 'summary_large_image' | 'player' | 'app' | undefined) ||
        undefined,
      title: cfg.TWITTER_TITLE || undefined,
      description: cfg.TWITTER_DESCRIPTION || undefined,
      images: cfg.TWITTER_IMAGE ? [cfg.TWITTER_IMAGE] : [],
      site: cfg.TWITTER_SITE || undefined,
      creator: cfg.TWITTER_CREATOR || undefined,
    },
    other: {
      // Custom meta tags that don't fit the Next.js metadata schema
      ...(cfg.META_AUTHOR ? { author: cfg.META_AUTHOR } : {}),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cfg = getRuntimeConfig();
  const theme = getTheme(cfg);
  const lang = cfg.LANG || 'en';

  return (
    <html lang={lang} className={theme}>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <meta property="og:type" content="siteweb" />
        <link href="css/fonts.css" rel="stylesheet" />
        <link rel="stylesheet" href="css/normalize.css" />
        <link rel="stylesheet" href={`css/${theme}.css`} />
        {cfg.THEME_OS && <link rel="stylesheet" href="css/os.css" />}
        <link rel="stylesheet" href="css/littlelink.css" />
        <link rel="stylesheet" href="css/brands.css" />
        {cfg.FAVICON_URL && (
          <link rel="icon" type="image/png" href={cfg.FAVICON_URL} />
        )}
        <AnalyticsScripts config={cfg} />
      </head>
      <body>
        <FontAwesomeInit>{children}</FontAwesomeInit>
      </body>
    </html>
  );
}
