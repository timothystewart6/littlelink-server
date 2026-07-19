const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs', 'cjs'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Allow .js imports to resolve to .ts/.tsx files during migration
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

module.exports = createJestConfig(customJestConfig);
