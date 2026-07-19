import type { RuntimeConfig } from '../config/runtimeConfig';
import { getSitemapLocation, isSitemapIndexable } from '../sitemap/sitemapXml';

type RobotsConfig = Partial<
  Pick<
    RuntimeConfig,
    'META_INDEX_STATUS' | 'OG_URL' | 'ROBOTS_ADDITIONAL_RULES' | 'ROBOTS_TXT'
  >
>;

function normalizeRobotsText(value: string | undefined): string | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  const normalized = value
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();

  return `${normalized}\n`;
}

function getSitemapIndexUrl(config: RobotsConfig): string | undefined {
  const location = getSitemapLocation({
    META_INDEX_STATUS: config.META_INDEX_STATUS,
    OG_URL: config.OG_URL,
  });
  if (!location) {
    return undefined;
  }
  return new URL('/sitemap.xml', location).toString();
}

export function buildRobotsTxt(config: RobotsConfig): string {
  const override = normalizeRobotsText(config.ROBOTS_TXT);
  if (override) {
    return override;
  }

  const lines = ['User-agent: *'];
  if (isSitemapIndexable(config.META_INDEX_STATUS)) {
    lines.push('Allow: /');
  } else {
    lines.push('Disallow: /');
  }

  const sections = [lines.join('\n')];
  const additionalRules = normalizeRobotsText(config.ROBOTS_ADDITIONAL_RULES);
  if (additionalRules) {
    sections.push(additionalRules.trim());
  }

  const sitemapUrl = getSitemapIndexUrl(config);
  if (sitemapUrl) {
    sections.push(`Sitemap: ${sitemapUrl}`);
  }

  return `${sections.join('\n\n')}\n`;
}
