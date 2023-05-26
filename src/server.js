import App from './components/App/App';
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { runtimeConfig } from './config';
import serialize from 'serialize-javascript'; // Safer stringify, prevents XSS attacks
import morgan from 'morgan';
import compression from 'compression';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css
          .map(asset => `<link rel="stylesheet" href="${asset}">`)
          .join('')
      : ''
    : '';
};

const jsScriptTagsFromAssets = (assets, entrypoint, extra = '') => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js
          .map(asset => `<script src="${asset}"${extra}></script>`)
          .join('')
      : ''
    : '';
};

const theme = runtimeConfig.THEME === 'Dark' ? 'dark' : 'light';

const helmet = require('helmet');
const server = express();

if (process.env.NODE_ENV === 'production') {
  server.use(
    morgan('combined', {
      skip: (req, res) => {
        if (
          (req?.originalUrl?.includes('/healthcheck') ||
            req?.baseUrl?.includes('/healthcheck')) &&
          runtimeConfig?.SKIP_HEALTH_CHECK_LOGS &&
          runtimeConfig.SKIP_HEALTH_CHECK_LOGS === 'true'
        ) {
          return true;
        } else {
          return false;
        }
      },
    }),
  );
  server.use(compression());
}

server
  .use(helmet.hidePoweredBy())
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/', (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>,
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="${runtimeConfig.LANG || 'en'}" class="${theme}">
    <head>
        <title >${runtimeConfig.META_TITLE || 'My Site'}</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <meta property="og:type" content="siteweb" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="${
          runtimeConfig.META_INDEX_STATUS || 'noindex'
        }">
        ${
          runtimeConfig.META_AUTHOR
            ? `<meta name="description" content="${runtimeConfig.META_DESCRIPTION}" />`
            : ''
        }
        ${
          runtimeConfig.META_AUTHOR
            ? `<meta name="author" content="${runtimeConfig.META_AUTHOR}" />`
            : ''
        }
        ${
          runtimeConfig.META_KEYWORDS
            ? `<meta name="keywords" content="${runtimeConfig.META_KEYWORDS}" />`
            : ''
        }

        ${
          runtimeConfig.OG_SITE_NAME
            ? `<meta property="og:site_name" content="${runtimeConfig.OG_SITE_NAME}" />`
            : ''
        }
        ${
          runtimeConfig.OG_TITLE
            ? `<meta property="og:title" content="${runtimeConfig.OG_TITLE}" />`
            : ''
        }
        ${
          runtimeConfig.OG_DESCRIPTION
            ? `<meta property="og:description" content="${runtimeConfig.OG_DESCRIPTION}" />`
            : ''
        }
        ${
          runtimeConfig.OG_URL
            ? `<meta property="og:url" content="${runtimeConfig.OG_URL}" />`
            : ''
        }
        ${
          runtimeConfig.OG_IMAGE
            ? `
                <meta property="og:image" content="${runtimeConfig.OG_IMAGE}" />
                <meta property="og:image:secure_url" content="${runtimeConfig.OG_IMAGE}" />
            `
            : ''
        }
        ${
          runtimeConfig.OG_IMAGE_WIDTH
            ? `<meta property="og:image:width" content="${runtimeConfig.OG_IMAGE_WIDTH}" />`
            : ''
        }
        ${
          runtimeConfig.OG_IMAGE_HEIGHT
            ? `<meta property="og:image:height" content="${runtimeConfig.OG_IMAGE_HEIGHT}" />`
            : ''
        }
        ${
          runtimeConfig.TWITTER_TITLE
            ? `<meta property="twitter:title" content="${runtimeConfig.TWITTER_TITLE}" />`
            : ''
        }
        ${
          runtimeConfig.TWITTER_DESCRIPTION
            ? `<meta property="twitter:description" content="${runtimeConfig.TWITTER_DESCRIPTION}" />`
            : ''
        }
        ${
          runtimeConfig.TWITTER_CARD
            ? `<meta property="twitter:card" content="${runtimeConfig.TWITTER_CARD}" />`
            : ''
        }
        ${
          runtimeConfig.TWITTER_IMAGE
            ? `<meta property="twitter:image" content="${runtimeConfig.TWITTER_IMAGE}" />`
            : ''
        }
        ${
          runtimeConfig.TWITTER_SITE
            ? `<meta property="twitter:site" content="${runtimeConfig.TWITTER_SITE}" />`
            : ''
        }
        ${
          runtimeConfig.TWITTER_CREATOR
            ? `<meta property="twitter:creator" content="${runtimeConfig.TWITTER_CREATOR}" />`
            : ''
        }
        <link href="css/fonts.css" rel="stylesheet">
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/${theme}.css">
        ${
          runtimeConfig.THEME_OS
            ? `<link rel="stylesheet" href="css/os.css">`
            : ''
        }
        <link rel="stylesheet" href="css/littlelink.css">
        <link rel="stylesheet" href="css/brands.css">
        ${cssLinksFromAssets(assets, 'client')}
        <link rel="icon" type="image/png" href="${runtimeConfig.FAVICON_URL}">
        ${
          runtimeConfig.GA_TRACKING_ID
            ? `
            <!-- Global site tag (gtag.js) - Google Analytics -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=${runtimeConfig.GA_TRACKING_ID}"></script>
            <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${runtimeConfig.GA_TRACKING_ID}');
      </script>`
            : ''
        }
        ${
          runtimeConfig.UMAMI_WEBSITE_ID && runtimeConfig.UMAMI_APP_URL
            ? `
            <!-- Umami Analytics -->
            <script async defer data-website-id="${
              runtimeConfig.UMAMI_WEBSITE_ID
            }" src="${runtimeConfig.UMAMI_APP_URL}/${
                runtimeConfig.UMAMI_SCRIPT_NAME || 'umami.js'
              }">
            </script>`
            : ''
        }
        ${
          runtimeConfig.MATOMO_URL && runtimeConfig.MATOMO_SITE_ID
            ? `
            <!-- Matomo -->
            <script type="text/javascript">
                var _paq = window._paq || [];
                /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
                _paq.push(['trackPageView']);
                _paq.push(['enableLinkTracking']);
                (function () {
                    var u = "${runtimeConfig.MATOMO_URL}/";
                    _paq.push(['setTrackerUrl', u + 'matomo.php']);
                    _paq.push(['setSiteId', '${runtimeConfig.MATOMO_SITE_ID}']);
                    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                    g.type = 'text/javascript';
                    g.async = true;
                    g.defer = true;
                    g.src = u + 'matomo.js';
                    s.parentNode.insertBefore(g, s);
                })();
            </script>
            <!-- Matomo End -->`
            : ''
        }
        ${
          runtimeConfig.PLAUSIBLE_DATA_DOMAIN &&
          runtimeConfig.PLAUSIBLE_DATA_API &&
          runtimeConfig.PLAUSIBLE_URL
            ? `
            <!-- Plausible Analytics -->
            <script async defer data-domain="${runtimeConfig.PLAUSIBLE_DATA_DOMAIN}" data-api="${runtimeConfig.PLAUSIBLE_DATA_API}" src="${runtimeConfig.PLAUSIBLE_URL}">
            </script>`
            : ''
        }

    </head>
    <body>
        ${
          runtimeConfig.MATOMO_URL && runtimeConfig.MATOMO_SITE_ID
            ? `
            <!-- Matomo Image Tracker-->
            <img referrerpolicy="no-referrer-when-downgrade" src="${runtimeConfig.MATOMO_URL}/matomo.php?idsite=${runtimeConfig.MATOMO_SITE_ID}&amp;rec=1" style="border:0" alt="" />
            <!-- End Matomo -->`
            : ''
        }
        <div id="root">${markup}</div>
        <script>window.env = ${serialize(runtimeConfig)};</script>
        ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
    </body>
    </html>`,
      );
    }
  });

server.get('/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default server;
