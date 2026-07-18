'use client';

import { useEffect } from 'react';

/**
 * AnalyticsTracker is a Client Component that uses event delegation to
 * capture button clicks and forward them to configured analytics providers.
 *
 * Usage:
 *   <AnalyticsTracker
 *     gaTrackingId={cfg.GA_TRACKING_ID}
 *     umamiWebsiteId={cfg.UMAMI_WEBSITE_ID}
 *     umamiAppUrl={cfg.UMAMI_APP_URL}
 *     matomoSiteId={cfg.MATOMO_SITE_ID}
 *     matomoUrl={cfg.MATOMO_URL}
 *   />
 *
 * Only the provider-enabled booleans are passed to this component.
 * The full runtime config is never shipped to the client bundle.
 */
export default function AnalyticsTracker({
  gaTrackingId,
  umamiWebsiteId,
  umamiAppUrl,
  matomoSiteId,
  matomoUrl,
}) {
  const hasGoogle = !!gaTrackingId;
  const hasUmami = !!(umamiWebsiteId && umamiAppUrl);
  const hasMatomo = !!(matomoSiteId && matomoUrl);

  useEffect(() => {
    function handleClick(e) {
      const link = e.target.closest('[data-analytics-event]');
      if (!link) return;

      const eventName = link.getAttribute('data-analytics-event');
      if (!eventName) return;

      if (hasGoogle && typeof window.gtag === 'function') {
        window.gtag('event', eventName);
      }

      if (
        hasUmami &&
        window.umami &&
        typeof window.umami.track === 'function'
      ) {
        window.umami.track(eventName);
      }

      if (hasMatomo && window._paq && Array.isArray(window._paq)) {
        window._paq.push(['trackEvent', eventName]);
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [hasGoogle, hasUmami, hasMatomo]);

  // This component renders nothing visible.
  return null;
}
