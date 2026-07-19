/**
 * Full-featured e2e test matching the README docker-compose example.
 *
 * Uses environment variables matching the documented docker-compose.yml example
 * to verify the essential page structure: no "undefined" text, correct title,
 * expected buttons rendered, healthcheck working, footer present.
 */

import { test, expect } from '@playwright/test';

const ENV: Record<string, string> = {
  META_TITLE: 'Techno Tim',
  META_DESCRIPTION:
    'Software Engineer | Gamer | Twitch Streamer | Content Creator on YouTube | Homelab | \uD83C\uDDFA\uD83C\uDDF8 \uD83C\uDDEF\uD83C\uDDF5  | Full Nerd',
  META_AUTHOR: 'Techno Tim',
  META_KEYWORDS: 'HomeLab, HTML, CSS, Engineering',
  LANG: 'en',
  META_INDEX_STATUS: 'all',
  OG_SITE_NAME: 'Techno Tim',
  OG_TITLE: 'Techno Tim',
  OG_DESCRIPTION: 'The home of Techno Tim',
  OG_URL: 'https://technotim.com',
  OG_IMAGE:
    'https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_400x400.jpg',
  OG_IMAGE_WIDTH: '400',
  OG_IMAGE_HEIGHT: '400',
  GA_TRACKING_ID: 'G-XXXXXXXXXX',
  ROBOTS_ADDITIONAL_RULES: 'User-agent: GPTBot\\nDisallow: /',
  THEME: 'Dark',
  FAVICON_URL:
    'https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_200x200.jpg',
  AVATAR_URL:
    'https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_200x200.jpg',
  AVATAR_2X_URL:
    'https://pbs.twimg.com/profile_images/1286144221217316864/qIAsKOpB_400x400.jpg',
  AVATAR_ALT: 'Techno Tim Profile Pic',
  NAME: 'TechnoTim',
  BIO: 'Software Engineer | Gamer | Twitch Streamer | Content Creator on YouTube | Homelab | \uD83C\uDDFA\uD83C\uDDF8 \uD83C\uDDEF\uD83C\uDDF5 | Full Nerd',
  BUTTON_ORDER:
    'YOUTUBE,TWITCH,TWITTER,GITHUB,INSTAGRAM,LINKED_IN,DISCORD,FACEBOOK,TIKTOK,PATREON,GEAR,DOCUMENTATION',
  CUSTOM_BUTTON_TEXT: 'Documentation,Recommended Gear',
  CUSTOM_BUTTON_URL:
    'https://l.technotim.com/docs,https://l.technotim.com/gear',
  CUSTOM_BUTTON_COLOR: '#000000,#000000',
  CUSTOM_BUTTON_TEXT_COLOR: '#ffffff,#ffffff',
  CUSTOM_BUTTON_ALT_TEXT:
    'Tech documentation site for my videos and more,Recommended Gear',
  CUSTOM_BUTTON_NAME: 'DOCUMENTATION,GEAR',
  CUSTOM_BUTTON_ICON: 'fas file-lines,fas gear',
  GITHUB: 'https://l.technotim.com/github',
  TWITTER: 'https://l.technotim.com/twitter',
  INSTAGRAM: 'https://www.instagram.com/techno.tim',
  LINKED_IN: 'https://l.technotim.com/linkedin',
  YOUTUBE: 'https://l.technotim.com/subscribe',
  TWITCH: 'https://l.technotim.com/twitch',
  DISCORD: 'https://l.technotim.com/discord',
  TIKTOK: 'https://l.technotim.com/tiktok',
  FACEBOOK: 'https://l.technotim.com/facebook',
  PATREON: 'https://l.technotim.com/patreon',
  FOOTER: 'Techno Tim \u00a9 2022',
};

test.describe('Full featured compose example', () => {
  test.use({ storageState: undefined });

  test('page has correct title from META_TITLE', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(ENV.META_TITLE!);
  });

  test('renderer does not leak "undefined" text anywhere', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const body = await page.locator('body').innerText();
    expect(body).not.toContain('undefined');
  });

  test('shows NAME as h1', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const h1 = page.locator('h1');
    await expect(h1).toHaveText(ENV.NAME!);
  });

  test('shows BIO as paragraph', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.getByText(ENV.BIO!.substring(0, 30))).toBeVisible();
  });

  test('renders all expected social buttons', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const links = page.locator('a.button');
    const count = await links.count();
    // We expect: 10 social + 2 custom = 12 buttons
    expect(count).toBeGreaterThanOrEqual(12);
  });

  test('custom buttons render with correct text', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.getByText('Documentation')).toBeVisible();
    await expect(page.getByText('Recommended Gear')).toBeVisible();
  });

  test('mobile layout stays centered without horizontal overflow', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const pageWidth = await page.evaluate(
      () => document.documentElement.clientWidth,
    );
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );

    expect(scrollWidth).toBeLessThanOrEqual(pageWidth);

    const viewportCenter = pageWidth / 2;
    const avatar = await page.locator('img.avatar').boundingBox();
    const title = await page.locator('h1').boundingBox();
    const firstButton = await page.locator('a.button').first().boundingBox();

    expect(avatar).not.toBeNull();
    expect(title).not.toBeNull();
    expect(firstButton).not.toBeNull();

    for (const box of [avatar, title, firstButton]) {
      const center = box!.x + box!.width / 2;
      expect(Math.abs(center - viewportCenter)).toBeLessThanOrEqual(2);
    }

    expect(firstButton!.width).toBeLessThan(300);
  });

  test('avatar image renders with correct alt text', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const avatar = page.locator('img').first();
    await expect(avatar).toHaveAttribute('alt', ENV.AVATAR_ALT!);
  });

  test('footer shows copyright text', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.getByText('Techno Tim \u00a9 2022')).toBeVisible();
  });

  test('html lang is set to configured LANG', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');
  });

  test('html class is set to dark theme', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const cls = await page.locator('html').getAttribute('class');
    expect(cls).toBe('dark');
  });

  test('meta description is present', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute('content', ENV.META_DESCRIPTION!);
  });

  test('meta keywords are present', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const metaKw = page.locator('meta[name="keywords"]');
    await expect(metaKw).toHaveAttribute('content', ENV.META_KEYWORDS!);
    // Verify no duplicate keywords meta tag
    await expect(metaKw).toHaveCount(1);
  });

  test('favicon link is present', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const favicon = page.locator('link[rel="icon"]');
    await expect(favicon).toHaveAttribute('href', ENV.FAVICON_URL!);
  });

  test('sitemap uses configured public URL', async ({ page }) => {
    const response = await page.request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/xml');

    const body = await response.text();
    expect(body).toContain('<urlset');
    expect(body).toContain(`<loc>${ENV.OG_URL}/</loc>`);
    expect(body).toContain('<changefreq>weekly</changefreq>');
    expect(body).toContain('<priority>1.0</priority>');
  });

  test('robots allows indexing, links sitemap, and appends custom rules', async ({
    page,
  }) => {
    const response = await page.request.get('/robots.txt');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/plain');

    const body = await response.text();
    expect(body).toContain('User-agent: *\nAllow: /');
    expect(body).toContain('User-agent: GPTBot\nDisallow: /');
    expect(body).toContain(`Sitemap: ${ENV.OG_URL}/sitemap.xml`);
  });

  test('healthcheck returns 200 and status ok', async ({ page }) => {
    const response = await page.request.get('/healthcheck');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ status: 'ok' });
  });
});
