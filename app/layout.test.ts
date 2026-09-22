/* eslint-disable @next/next/no-css-tags */
import { describe, it, expect } from 'vitest';
import { getRuntimeConfig } from '../src/config/runtimeConfig';

describe('generateMetadata', () => {
  it('generates default metadata with default config', () => {
    const cfg = getRuntimeConfig();
    const metadata = {
      title: cfg.META_TITLE || 'My Site',
      description: cfg.META_DESCRIPTION || undefined,
      authors: cfg.META_AUTHOR ? [{ name: cfg.META_AUTHOR }] : undefined,
      keywords: cfg.META_KEYWORDS || undefined,
      robots: cfg.META_INDEX_STATUS || 'noindex',
    };
    expect(metadata.title).toBe('My Site');
  });

  it('generates metadata with custom config', () => {
    const cfg = getRuntimeConfig({
      META_TITLE: 'Custom Title',
      META_DESCRIPTION: 'Custom description',
      META_AUTHOR: 'John Doe',
      META_KEYWORDS: 'keyword1, keyword2',
      META_INDEX_STATUS: 'index',
    });

    const metadata = {
      title: cfg.META_TITLE || 'My Site',
      description: cfg.META_DESCRIPTION || undefined,
      authors: cfg.META_AUTHOR ? [{ name: cfg.META_AUTHOR }] : undefined,
      keywords: cfg.META_KEYWORDS || undefined,
      robots: cfg.META_INDEX_STATUS || 'noindex',
    };
    expect(metadata.title).toBe('Custom Title');
    expect(metadata.description).toBe('Custom description');
    expect(metadata.authors).toEqual([{ name: 'John Doe' }]);
    expect(metadata.keywords).toBe('keyword1, keyword2');
    expect(metadata.robots).toBe('index');
  });

  it('generates metadata with all optional fields', () => {
    const cfg = getRuntimeConfig({
      META_TITLE: 'Full Title',
      META_DESCRIPTION: 'Full description',
      META_AUTHOR: 'Jane Doe',
      META_KEYWORDS: 'tag1, tag2, tag3',
      META_INDEX_STATUS: 'index',
      OG_TITLE: 'OG Title',
      OG_DESCRIPTION: 'OG Description',
      OG_SITE_NAME: 'Site Name',
      OG_URL: 'https://example.com',
      OG_IMAGE: 'https://example.com/image.png',
      OG_IMAGE_WIDTH: '800',
      OG_IMAGE_HEIGHT: '600',
      TWITTER_CARD: 'summary_large_image',
      TWITTER_TITLE: 'Twitter Title',
      TWITTER_DESCRIPTION: 'Twitter Description',
      TWITTER_IMAGE: 'https://example.com/twitter-image.png',
      TWITTER_SITE: '@twitterhandle',
      TWITTER_CREATOR: '@creatorhandle',
    });

    expect(cfg.META_TITLE).toBe('Full Title');
    expect(cfg.META_DESCRIPTION).toBe('Full description');
    expect(cfg.META_AUTHOR).toBe('Jane Doe');
    expect(cfg.META_KEYWORDS).toBe('tag1, tag2, tag3');
    expect(cfg.META_INDEX_STATUS).toBe('index');
  });
});