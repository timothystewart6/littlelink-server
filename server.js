/* eslint-disable no-console */
const {
  getRuntimeConfig,
  shouldSkipHealthLog,
} = require('./src/config/runtimeConfig');
const next = require('next');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = parseInt(process.env.PORT || '3000', 10);

app.prepare().then(() => {
  const server = express();

  if (!dev) {
    server.use(
      morgan('combined', {
        skip: req => {
          if (
            req?.originalUrl?.includes('/healthcheck') &&
            shouldSkipHealthLog(getRuntimeConfig())
          ) {
            return true;
          }
          return false;
        },
      }),
    );
    server.use(compression());
  }

  server.disable('x-powered-by');

  server.use((req, res) => {
    return handle(req, res);
  });

  server.listen(port, '0.0.0.0', err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`> Started on port ${port}`);
  });
});
