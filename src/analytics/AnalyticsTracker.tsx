'use client';

import { useEffect } from 'react';

export interface AnalyticsTrackerProps {
  gaTrackingId?: string;
  umamiWebsiteId?: string;
  umamiAppUrl?: string;
  matomoSiteId?: string;
  matomoUrl?: string;
}

/**
 * AnalyticsTracker is a Client Component that uses event delegation to
 * capture button clicks and forward them to configured analytics providers.
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
}: AnalyticsTrackerProps) {
  const hasGoogle = !!gaTrackingId;
  const hasUmami = !!(umamiWebsiteId && umamiAppUrl);
  const hasMatomo = !!(matomoSiteId && matomoUrl);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('[data-analytics-event]');
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

  return null;
}
