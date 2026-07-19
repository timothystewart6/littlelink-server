import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Keeps docker-compose.yml aligned with the canonical runtime env allowlist.
// Usage:
//   yarn compose-env:sync        updates docker-compose.yml in place
//   yarn compose-env:check       verifies docker-compose.yml is already synced

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const envNamesPath = path.join(repositoryRoot, 'src/config/envNames.ts');
const composePath = path.join(repositoryRoot, 'docker-compose.yml');
const checkOnly = process.argv.includes('--check');

// Existing compose values are preserved. These placeholders are only used when
// ENV_NAMES gains a key that is missing from the compose example.
const fallbackValues = Object.freeze({
  AVATAR_SIZE: '128px',
  CUSTOM_BUTTON_ALT_TEXT:
    'Tech documentation site for my videos and more,Recommended Gear',
  CUSTOM_BUTTON_COLOR: '#000000,#000000',
  CUSTOM_BUTTON_ICON: 'fas file-lines,fas gear',
  CUSTOM_BUTTON_NAME: 'DOCUMENTATION,GEAR',
  CUSTOM_BUTTON_TEXT: 'Documentation,Recommended Gear',
  CUSTOM_BUTTON_TEXT_COLOR: '#ffffff,#ffffff',
  CUSTOM_BUTTON_URL:
    'https://l.technotim.com/docs,https://l.technotim.com/gear',
  DROP_SHADOW: 'medium',
  GA_TRACKING_ID: 'G-XXXXXXXXXX',
  JETPHOTOS: 'https://www.jetphotos.com/',
  LINKED_IN: 'https://linkedin.com',
  MATOMO_SITE_ID: '42',
  MATOMO_URL: 'https://matomo.example.com',
  PLAUSIBLE_DATA_API: 'https://plausible.example.com/api/event',
  PLAUSIBLE_DATA_DOMAIN: 'example.com',
  PLAUSIBLE_URL: 'https://plausible.example.com/js/script.js',
  ROBOTS_ADDITIONAL_RULES: 'User-agent: GPTBot\nDisallow: /',
  ROBOTS_TXT: '',
  SKIP_HEALTH_CHECK_LOGS: 'true',
  SUBSTACK: 'https://substack.com/',
  THEME_OS: '',
  THREADS: 'https://www.threads.net/',
  TWITTER_DESCRIPTION: 'Techno Tim Link page',
  TWITTER_TITLE: 'Techno Tim',
});

function readEnvNames() {
  const source = fs.readFileSync(envNamesPath, 'utf8');
  const match = source.match(
    /ENV_NAMES\s*=\s*Object\.freeze\(\[([\s\S]*?)\]\s*as const\)/,
  );

  if (!match) {
    throw new Error(`Could not find ENV_NAMES in ${envNamesPath}`);
  }

  return [...match[1].matchAll(/'([^']+)'/g)].map(envName => envName[1]);
}

function parseComposeEntry(line) {
  const listItem = line.match(/^\s*-\s*(.+?)\s*$/);

  if (!listItem) {
    return undefined;
  }

  const rawEntry = listItem[1];
  const entry = parseScalar(rawEntry);
  const separatorIndex = entry.indexOf('=');

  if (separatorIndex === -1) {
    return undefined;
  }

  return {
    key: entry.slice(0, separatorIndex),
    value: entry.slice(separatorIndex + 1),
  };
}

function parseScalar(value) {
  if (value.startsWith('"') && value.endsWith('"')) {
    return JSON.parse(value);
  }

  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replaceAll("''", "'");
  }

  return value;
}

function formatComposeEntry(key, value) {
  const entry = `${key}=${value}`;

  // YAML treats colon-space and literal newlines specially, so quote only the
  // values that need it and leave the rest in the familiar KEY=value form.
  if (value.includes('\n') || value.includes(': ')) {
    return `      - ${JSON.stringify(entry)}`;
  }

  return `      - ${entry}`;
}

function syncComposeEnvironment(envNames, composeSource) {
  const lines = composeSource
    .split('\n')
    .filter(line => line.trim() !== 'version: "3.0"');
  const environmentIndex = lines.findIndex(
    line => line.trim() === 'environment:',
  );
  const portsIndex = lines.findIndex(
    (line, index) => index > environmentIndex && line.trim() === 'ports:',
  );

  if (environmentIndex === -1 || portsIndex === -1) {
    throw new Error('Could not find docker-compose.yml environment block');
  }

  const currentValues = new Map();
  const currentEnvironmentLines = lines.slice(environmentIndex + 1, portsIndex);

  // Parse the current list first so rerunning the script does not reset local
  // example values just because the list needs sorting or a new key was added.
  for (const line of currentEnvironmentLines) {
    const entry = parseComposeEntry(line);

    if (entry) {
      currentValues.set(entry.key, entry.value);
    }
  }

  const envNameSet = new Set(envNames);
  const extra = [...currentValues.keys()].filter(key => !envNameSet.has(key));
  const missing = envNames.filter(key => !currentValues.has(key));

  for (const key of missing) {
    currentValues.set(key, fallbackValues[key] ?? '');
  }

  // ENV_NAMES is the source of truth for membership; this script owns ordering.
  const nextEnvironmentLines = [...envNames]
    .sort((left, right) => left.localeCompare(right))
    .map(key => formatComposeEntry(key, currentValues.get(key) ?? ''));

  lines.splice(
    environmentIndex + 1,
    currentEnvironmentLines.length,
    ...nextEnvironmentLines,
  );

  return {
    content: lines.join('\n'),
    extra,
    missing,
  };
}

const envNames = readEnvNames();
const composeSource = fs.readFileSync(composePath, 'utf8');
const result = syncComposeEnvironment(envNames, composeSource);

if (checkOnly && result.content !== composeSource) {
  console.error(
    'docker-compose.yml is out of sync with src/config/envNames.ts. Run yarn compose-env:sync.',
  );
  console.error(
    JSON.stringify(
      {
        added: result.missing,
        removedExtraEntries: result.extra,
      },
      null,
      2,
    ),
  );
  process.exit(1);
}

if (!checkOnly && result.content !== composeSource) {
  fs.writeFileSync(composePath, result.content);
}

process.stdout.write(
  JSON.stringify(
    {
      mode: checkOnly ? 'check' : 'write',
      envNames: envNames.length,
      added: result.missing,
      removedExtraEntries: result.extra,
      changed: result.content !== composeSource,
    },
    null,
    2,
  ) + '\n',
);
