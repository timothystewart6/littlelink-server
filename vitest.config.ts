import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'src/**/*.{ts,tsx}',
        'app/**/*.{ts,tsx}',
        'server.ts',
        'next.config.ts',
      ],
      exclude: [
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/__mocks__/**',
        'src/types/**',
        'src/icons/**',
      ],
    },
    globals: true,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/dist-server/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
      '**/*.d.ts',
    ],
  },
  resolve: {
    alias: {
      '@': '/workspace/src',
    },
  },
  optimizeDeps: {
    include: ['@fortawesome/react-fontawesome'],
  },
  plugins: [tsconfigPaths()],
});
