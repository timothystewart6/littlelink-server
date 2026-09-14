import { resolve } from 'node:path';

export default {
  test: {
    filename: ['**/*.test.ts', '**/*.test.tsx'],
    dir: resolve(new URL('.', import.meta.url).pathname),
    setup: ['./tests/switchyard-comprehensive-tests/setup.mjs'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules',
        '.next',
        'coverage',
        '.cache',
        'dist-server',
        '**/*.d.ts',
        '**/types/**',
        'scripts',
        'tests/switchyard-comprehensive-tests/css-stub.js',
      ],
    },
  },
};
