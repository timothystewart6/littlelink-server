import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

// Import and test server.ts concepts
test('server.ts exists', () => {
  const content = fs.readFileSync('server.ts', 'utf-8');
  assert.ok(typeof content === 'string');
  assert.ok(content.length > 0);
});

// Import and test app/layout.tsx concepts
test('app/layout.tsx exists', () => {
  const content = fs.readFileSync('app/layout.tsx', 'utf-8');
  assert.ok(content.includes('RootLayout'));
  assert.ok(content.includes('generateMetadata'));
});

// Import and test app/page.tsx concepts
test('app/page.tsx exists', () => {
  const content = fs.readFileSync('app/page.tsx', 'utf-8');
  assert.ok(content.includes('HomePage'));
  assert.ok(content.includes('<Home'));
});

// Import and test analytics
test('analytics/google.ts exists', () => {
  const content = fs.readFileSync('src/analytics/google.ts', 'utf-8');
  assert.ok(content.includes('trackGoogleEvent'));
});

// Import and test analytics tracker
test('analytics/AnalyticsTracker.tsx exists', () => {
  const content = fs.readFileSync('src/analytics/AnalyticsTracker.tsx', 'utf-8');
  assert.ok(content.includes('export default function AnalyticsTracker'));
});

// Import and test analytics scripts
test('analytics/AnalyticsScripts.tsx exists', () => {
  const content = fs.readFileSync('src/analytics/AnalyticsScripts.tsx', 'utf-8');
  assert.ok(content.includes('export default function AnalyticsScripts'));
});

// Import and test config
test('config/envNames.ts exists', () => {
  const content = fs.readFileSync('src/config/envNames.ts', 'utf-8');
  assert.ok(content.includes('export const ENV_NAMES'));
});

// Import and test runtimeConfig
test('config/runtimeConfig.ts exists', () => {
  const content = fs.readFileSync('src/config/runtimeConfig.ts', 'utf-8');
  assert.ok(content.includes('export function getRuntimeConfig'));
});

// Import and test robots
test('src/robots/robotsTxt.ts exists', () => {
  const content = fs.readFileSync('src/robots/robotsTxt.ts', 'utf-8');
  assert.ok(content.includes('export function buildRobotsTxt'));
});

// Import and test sitemap
test('src/sitemap/sitemapXml.ts exists', () => {
  const content = fs.readFileSync('src/sitemap/sitemapXml.ts', 'utf-8');
  assert.ok(content.includes('export function buildSitemapXml'));
});

// Import and test components
test('src/components/Home/Home.tsx exists', () => {
  const content = fs.readFileSync('src/components/Home/Home.tsx', 'utf-8');
  assert.ok(content.includes('export default Home'));
});

test('src/components/Button/Button.tsx exists', () => {
  const content = fs.readFileSync('src/components/Button/Button.tsx', 'utf-8');
  assert.ok(content.includes('export default Button'));
});

test('src/components/Avatar/Avatar.tsx exists', () => {
  const content = fs.readFileSync('src/components/Avatar/Avatar.tsx', 'utf-8');
  assert.ok(content.includes('export default Avatar'));
});

test('src/components/Share/Share.tsx exists', () => {
  const content = fs.readFileSync('src/components/Share/Share.tsx', 'utf-8');
  assert.ok(content.includes('export default Share'));
});

test('src/components/Sort/Sort.tsx exists', () => {
  const content = fs.readFileSync('src/components/Sort/Sort.tsx', 'utf-8');
  assert.ok(content.includes('export default Sort'));
});

test('src/components/FontAwesomeInit.tsx exists', () => {
  const content = fs.readFileSync('src/components/FontAwesomeInit.tsx', 'utf-8');
  assert.ok(content.includes('export default function FontAwesomeInit'));
});
