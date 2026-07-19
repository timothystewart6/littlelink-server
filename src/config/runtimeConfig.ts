/**
 * Request-time runtime configuration reader.
 *
 * This module reads environment variables at call time, not at module
 * load time. Every call to getRuntimeConfig produces a new plain object.
 * This ensures that container environment values set after the image was
 * built are reflected in every request without a process restart.
 *
 * Only unprefixed names are read. The old RAZZLE_ prefix is not retained
 * because production containers never used that prefix and the goal is to
 * remove every Razzle convention.
 */

import { ENV_NAMES } from './envNames';
export { ENV_NAMES } from './envNames';
import type { EnvName } from './envNames';

export type RuntimeConfig = Readonly<Record<EnvName, string | undefined>>;
export type Theme = 'dark' | 'light';
export type DropShadow = 'light' | 'medium' | 'heavy';

/**
 * Return a fresh runtime configuration object from the given environment.
 */
export function getRuntimeConfig(
  env?: Readonly<Record<string, string | undefined>>,
): RuntimeConfig {
  if (!env) {
    env = process.env as Record<string, string | undefined>;
  }
  const config: Record<string, string | undefined> = {};
  for (const key of ENV_NAMES) {
    config[key] = env[key];
  }
  return config as RuntimeConfig;
}

/**
 * Determine the effective theme class name.
 *
 * Only THEME=Dark (uppercase D, exact spelling) produces "dark".
 * Every other value including "dark" (lowercase) produces "light".
 */
export function getTheme(config: RuntimeConfig): Theme {
  return config.THEME === 'Dark' ? 'dark' : 'light';
}

/**
 * Determine whether health-check access logs should be suppressed.
 *
 * Only exactly SKIP_HEALTH_CHECK_LOGS=true suppresses logging.
 */
export function shouldSkipHealthLog(config: RuntimeConfig): boolean {
  return config.SKIP_HEALTH_CHECK_LOGS === 'true';
}
