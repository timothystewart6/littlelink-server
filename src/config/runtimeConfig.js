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

const { ENV_NAMES } = require('./envNames');

/**
 * Return a fresh runtime configuration object from the given environment.
 *
 * @param {object} [env=process.env]
 * @returns {Record<string, string|undefined>}
 */
function getRuntimeConfig(env) {
  if (!env) {
    env = process.env;
  }
  const config = {};
  for (const key of ENV_NAMES) {
    config[key] = env[key];
  }
  return config;
}

/**
 * Determine the effective theme class name.
 *
 * Only THEME=Dark (uppercase D, exact spelling) produces "dark".
 * Every other value including "dark" (lowercase) produces "light".
 *
 * @param {object} config - A runtime config object from getRuntimeConfig()
 * @returns {'dark'|'light'}
 */
function getTheme(config) {
  return config.THEME === 'Dark' ? 'dark' : 'light';
}

/**
 * Determine whether health-check access logs should be suppressed.
 *
 * Only exactly SKIP_HEALTH_CHECK_LOGS=true suppresses logging.
 *
 * @param {object} config - A runtime config object from getRuntimeConfig()
 * @returns {boolean}
 */
function shouldSkipHealthLog(config) {
  return config.SKIP_HEALTH_CHECK_LOGS === 'true';
}

module.exports = { getRuntimeConfig, getTheme, shouldSkipHealthLog, ENV_NAMES };
