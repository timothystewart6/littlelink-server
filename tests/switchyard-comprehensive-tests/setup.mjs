// CSS mock for Node.js test runner with tsx
// Intercept .css imports and return an empty module

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const Module = require('node:module');
const origResolve = Module._resolveFilename;

Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.endsWith('.css')) {
    return require.resolve('./css-stub.js');
  }
  // Mock @fortawesome/react-fontawesome to avoid needing icon library init
  if (request === '@fortawesome/react-fontawesome') {
    return require.resolve('./fontawesome-mock.js');
  }
  // Mock next/script to avoid needing Next.js runtime
  if (request === 'next/script' || request === 'next/image') {
    return require.resolve('./next-script-mock.js');
  }
  return origResolve.call(this, request, parent, isMain, options);
};
