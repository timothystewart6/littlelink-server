/**
 * Minimal-environment e2e test.
 *
 * Uses a Docker container started with no environment variables to verify
 * the page renders gracefully without "undefined" text anywhere.
 */

import { test, expect } from '@playwright/test';

test.describe('Minimal env (no variables set)', () => {
  test('page does not contain "undefined" text', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const body = await page.locator('body').innerText();
    expect(body).not.toContain('undefined');
  });

  test('page defaults to My Site title', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle('My Site');
  });

  test('no h1 is rendered when NAME is not set', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(0);
  });

  test('html class defaults to light', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const cls = await page.locator('html').getAttribute('class');
    expect(cls).toBe('light');
  });

  test('no buttons render when no social env vars are set', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const buttons = page.locator('a.button');
    await expect(buttons).toHaveCount(0);
  });

  test('healthcheck still works with no env vars', async ({ page }) => {
    const response = await page.request.get('/healthcheck');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ status: 'ok' });
  });
});
