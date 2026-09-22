import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'app/**/*.test.ts', 'app/**/*.test.tsx'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['app/**', 'src/**', 'server.ts'],
      exclude: [
        'app/**/*.test.*',
        'src/**/*.test.*',
        'src/**/__mocks__/**',
        '**.config.ts',
        '**.config.js',
        '**.config.mjs',
        'eslint.config.*',
        'next.config.*',
        'vitest.config.*',
        'scripts/**',
        'public/**',
        'static/**',
        'generated/**',
        '.next/**',
        'dist/**',
        'dist-server/**',
        'build/**',
        'node_modules/**',
        'coverage/**',
        '**/*.d.ts',
      ],
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
});
