// src/setupTests.js
// Suppress React Router v6->v7 future flag deprecation warnings
// These fire async after tests complete and cause "Cannot log after tests are done" warnings

const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('React Router Future Flag Warning')
  ) {
    return;
  }
  originalWarn.apply(console, args);
};
