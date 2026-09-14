// Mock CSS imports for the Node.js test runner with tsx
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// Intercept .css module resolution
const Module = require('node:module');
const originalResolve = Module._resolveFilename;

Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.endsWith('.css')) {
    return require.resolve('./css-stub.js');
  }
  return originalResolve.call(this, request, parent, isMain, options);
};
