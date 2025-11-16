## 📈 Analytics Support

### Google Analytics

See [Getting Started with Analytics](https://support.google.com/analytics/answer/1008015?hl=en). After getting your GA Tracking Id, use your tracking Id as environment variable like `GA_TRACKING_ID=G-XXXXXXXXXX`  (See the example below)

All buttons clicked will be tracked automatically if `GA_TRACKING_ID` exists.

Sample event for YouTube button.

```javascript
  window.gtag('event', 'youtube-button');
```

### Umami

See [Adding a website & Collecting data](https://umami.is/docs/collect-data) page to add and generate your tracking code.

Generated tracking code should look like:

```javascript
<script async defer data-website-id="00000000-1111-2222-3333-444444444444" src="https://your-umami-app.com/umami.js"></script>
```

Use `data-website-id` as environment variable `UMAMI_WEBSITE_ID`. Take the inital root host of `src` as `UMAMI_APP_URL`, and the name of the script (i.e. `umami.js` or `script.js`) as `UMAMI_SCRIPT_NAME`.

Sample event for YouTube button.

```javascript
  window.umami.track('youtube-button');
```

### Matomo 

See [Installing Matomo fo how to configure analytics](https://matomo.org/docs/installation/) and [how to find your site id](https://matomo.org/faq/general/faq_19212/)

Use `MATOMO_URL` for your URL and `MATOMO_SITE_ID` for your site id

Sample event for YouTube button.

```javascript
  window._paq.push(['trackEvent', 'youtube-button']]);