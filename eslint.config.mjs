import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettierPlugin from 'eslint-plugin-prettier';

const prettierConfig = {
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxSingleQuote: false,
        arrowParens: 'avoid',
        semi: true,
        trailingComma: 'all',
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-alert': 'error',
    'no-debugger': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'no-unused-vars': ['error', { args: 'none' }],
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
  },
};

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'build/**',
      'coverage/**',
      'test-results/**',
      'next-env.d.ts',
      'cache/**',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettierConfig,
  {
    files: ['**/*.test.js', '**/*.test.jsx', '**/*.spec.js'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
  },
  {
    files: ['e2e/**/*.js', 'e2e/**/*.spec.js'],
    languageOptions: {
      globals: {
        test: 'readonly',
        expect: 'readonly',
      },
    },
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];

export default eslintConfig;
