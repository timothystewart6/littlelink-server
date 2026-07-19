/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Script from 'next/script';
import type { RuntimeConfig } from '../config/runtimeConfig';

/**
 * Safely encode a string for inline JavaScript context.
 * Escapes <, >, U+2028, U+2029, and backslash to prevent injection
 * when interpolating into <script> content.
 */
function safeJsEncode(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/</g, '\\x3C')
    .replace(/>/g, '\\x3E')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export { safeJsEncode };

export default function AnalyticsScripts({
  config,
}: {
  config: Partial<RuntimeConfig>;
}) {
  const scripts: React.ReactElement[] = [];

  // Google Analytics
  if (config.GA_TRACKING_ID) {
    const gaId = safeJsEncode(config.GA_TRACKING_ID);
    scripts.push(
      <React.Fragment key="ga">
        <Script
          id="ga-script"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');
`}
        </Script>
      </React.Fragment>,
    );
  }

  // Umami Analytics
  if (config.UMAMI_WEBSITE_ID && config.UMAMI_APP_URL) {
    const umamiWebsiteId = safeJsEncode(config.UMAMI_WEBSITE_ID);
    const umamiAppUrl = safeJsEncode(config.UMAMI_APP_URL);
    const scriptName = safeJsEncode(config.UMAMI_SCRIPT_NAME || 'umami.js');
    scripts.push(
      <Script
        key="umami"
        id="umami-script"
        src={`${umamiAppUrl}/${scriptName}`}
        strategy="afterInteractive"
        data-website-id={umamiWebsiteId}
      />,
    );
  }

  // Matomo Analytics
  if (config.MATOMO_URL && config.MATOMO_SITE_ID) {
    const matomoUrl = safeJsEncode(config.MATOMO_URL);
    const matomoSiteId = safeJsEncode(config.MATOMO_SITE_ID);
    scripts.push(
      <React.Fragment key="matomo">
        <Script id="matomo-init" strategy="afterInteractive">
          {`
var _paq = window._paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
  var u = '${matomoUrl}/';
  _paq.push(['setTrackerUrl', u + 'matomo.php']);
  _paq.push(['setSiteId', '${matomoSiteId}']);
  var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
  g.type = 'text/javascript';
  g.async = true;
  g.defer = true;
  g.src = u + 'matomo.js';
  s.parentNode.insertBefore(g, s);
})();
`}
        </Script>
        <noscript key="matomo-img">
          <img
            referrerPolicy="no-referrer-when-downgrade"
            src={`${matomoUrl}/matomo.php?idsite=${matomoSiteId}&rec=1`}
            style={{ border: 0 }}
            alt=""
          />
        </noscript>
      </React.Fragment>,
    );
  }

  // Plausible Analytics
  if (
    config.PLAUSIBLE_DATA_DOMAIN &&
    config.PLAUSIBLE_DATA_API &&
    config.PLAUSIBLE_URL
  ) {
    const dataDomain = safeJsEncode(config.PLAUSIBLE_DATA_DOMAIN);
    const dataApi = safeJsEncode(config.PLAUSIBLE_DATA_API);
    const plausibleUrl = safeJsEncode(config.PLAUSIBLE_URL);
    scripts.push(
      <Script
        key="plausible"
        id="plausible-script"
        src={plausibleUrl}
        strategy="afterInteractive"
        data-domain={dataDomain}
        data-api={dataApi}
      />,
    );
  }

  return scripts;
}
