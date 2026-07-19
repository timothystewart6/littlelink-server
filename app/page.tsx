import React from 'react';
import Home from '../src/components/Home/Home';
import AnalyticsTracker from '../src/analytics/AnalyticsTracker';
import { getRuntimeConfig } from '../src/config/runtimeConfig';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const config = getRuntimeConfig();

  return (
    <>
      <Home config={config} />
      <AnalyticsTracker
        gaTrackingId={config.GA_TRACKING_ID}
        umamiWebsiteId={config.UMAMI_WEBSITE_ID}
        umamiAppUrl={config.UMAMI_APP_URL}
        matomoSiteId={config.MATOMO_SITE_ID}
        matomoUrl={config.MATOMO_URL}
      />
    </>
  );
}
