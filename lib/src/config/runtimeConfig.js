"use strict";
/**
 * Request-time runtime configuration reader.
 *
 * This module reads environment variables at call time, not at module
 * load time. Every call to getRuntimeConfig produces a new plain object.
 * This ensures that container environment values set after the image was
 * built are reflected in every request without a process restart.
 *
 * Only documented, unprefixed names are read.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_NAMES = void 0;
exports.getRuntimeConfig = getRuntimeConfig;
exports.getTheme = getTheme;
exports.shouldSkipHealthLog = shouldSkipHealthLog;
const envNames_1 = require("./envNames");
var envNames_2 = require("./envNames");
Object.defineProperty(exports, "ENV_NAMES", { enumerable: true, get: function () { return envNames_2.ENV_NAMES; } });
/**
 * Return a fresh runtime configuration object from the given environment.
 */
function getRuntimeConfig(env) {
    if (!env) {
        env = process.env;
    }
    const config = {};
    for (const key of envNames_1.ENV_NAMES) {
        config[key] = env[key];
    }
    return config;
}
/**
 * Determine the effective theme class name.
 *
 * Only THEME=Dark (uppercase D, exact spelling) produces "dark".
 * Every other value including "dark" (lowercase) produces "light".
 */
function getTheme(config) {
    return config.THEME === 'Dark' ? 'dark' : 'light';
}
/**
 * Determine whether health-check access logs should be suppressed.
 *
 * Only exactly SKIP_HEALTH_CHECK_LOGS=true suppresses logging.
 */
function shouldSkipHealthLog(config) {
    return config.SKIP_HEALTH_CHECK_LOGS === 'true';
}
