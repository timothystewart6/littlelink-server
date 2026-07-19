import type { RuntimeConfig } from '../config/runtimeConfig';

const CHANGE_FREQUENCY = 'weekly';
const PRIORITY = '1.0';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function isSitemapIndexable(
  metaIndexStatus: string | undefined,
): boolean {
  if (!metaIndexStatus) {
    return false;
  }
  return !metaIndexStatus.toLowerCase().includes('noindex');
}

export function normalizeSitemapUrl(
  value: string | undefined,
): string | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return undefined;
    }

    url.hash = '';
    if (!url.pathname.endsWith('/')) {
      url.pathname = `${url.pathname}/`;
    }
    return url.toString();
  } catch {
    return undefined;
  }
}

export function getSitemapLocation(
  config: Pick<RuntimeConfig, 'META_INDEX_STATUS' | 'OG_URL'>,
): string | undefined {
  if (!isSitemapIndexable(config.META_INDEX_STATUS)) {
    return undefined;
  }
  return normalizeSitemapUrl(config.OG_URL);
}

export function buildSitemapXml(location: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(location)}</loc>
    <changefreq>${CHANGE_FREQUENCY}</changefreq>
    <priority>${PRIORITY}</priority>
  </url>
</urlset>
`;
}
