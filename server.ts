/* eslint-disable no-console */
import {
  getRuntimeConfig,
  shouldSkipHealthLog,
} from './src/config/runtimeConfig';
import next from 'next';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import type { Request } from 'express';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = parseInt(process.env.PORT || '3000', 10);

app.prepare().then(() => {
  const server = express();

  if (!dev) {
    server.use(
      morgan('combined', {
        skip: (req: Request) => {
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

  server.listen(port, '0.0.0.0', (err?: Error | null) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`> Started on port ${port}`);
  });
});
