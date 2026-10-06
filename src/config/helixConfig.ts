/**
 * Configuration helpers for the DNA helix layout.
 *
 * The helix is opt-in. LAYOUT must be exactly "dna" (case-insensitive) for
 * the double-helix renderer to replace the stock vertical button list. Every
 * other value, including unset, leaves the original layout untouched.
 */

import type { RuntimeConfig } from './runtimeConfig';

export type HelixStyle = 'bio' | 'chroma' | 'clinical';
export type ParticleDensity = 'off' | 'subtle' | 'rich';

export interface HelixOptions {
  /** Visual treatment applied to the strands and the link tablets. */
  style: HelixStyle;
  /**
   * Whole turns of the helix across the full list of buttons.
   *
   * This must be an integer. The list wraps by shifting each button a whole
   * list-length along the strand, so the twist across that shift has to be a
   * whole number of revolutions for the seam to be invisible. A fractional
   * value would make the strand visibly jump at the wrap point.
   */
  turns: number;
  /** Helix radius in CSS pixels, before the viewport fit is applied. */
  radius: number;
  /** Vertical distance between neighbouring base pairs, in CSS pixels. */
  rise: number;
  /** Whether the strand turns slowly on its own while the pointer is away. */
  drift: boolean;
  /** How much orbital life surrounds the strand. */
  particles: ParticleDensity;
  /** Whether visitors get a control panel behind a gear button. */
  controls: boolean;
}

export interface BioContent {
  /** First paragraph, displayed larger as a lede. */
  lede: string;
  /** Remaining paragraphs, in order. */
  body: string[];
}

const STYLES: readonly HelixStyle[] = ['bio', 'chroma', 'clinical'];
const DENSITIES: readonly ParticleDensity[] = ['off', 'subtle', 'rich'];

const DEFAULTS: HelixOptions = {
  style: 'bio',
  turns: 2,
  radius: 172,
  rise: 90,
  drift: true,
  particles: 'subtle',
  controls: false,
};

/** Read a bounded integer from an environment string. */
function intInRange(
  raw: string | undefined,
  fallback: number,
  min: number,
  max: number,
): number {
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw.trim(), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

/**
 * Determine whether the DNA helix layout is enabled.
 */
export function isHelixLayout(config: RuntimeConfig): boolean {
  return (config.LAYOUT || '').trim().toLowerCase() === 'dna';
}

/**
 * Resolve the helix rendering options, falling back to the defaults for any
 * value that is unset or out of range.
 */
export function getHelixOptions(config: RuntimeConfig): HelixOptions {
  const rawStyle = (config.HELIX_STYLE || '').trim().toLowerCase();
  const style = (STYLES as readonly string[]).includes(rawStyle)
    ? (rawStyle as HelixStyle)
    : DEFAULTS.style;

  const rawDensity = (config.HELIX_PARTICLES || '').trim().toLowerCase();
  const particles = (DENSITIES as readonly string[]).includes(rawDensity)
    ? (rawDensity as ParticleDensity)
    : DEFAULTS.particles;

  return {
    style,
    turns: intInRange(config.HELIX_TURNS, DEFAULTS.turns, 1, 6),
    radius: intInRange(config.HELIX_RADIUS, DEFAULTS.radius, 90, 320),
    rise: intInRange(config.HELIX_RISE, DEFAULTS.rise, 50, 190),
    drift: (config.HELIX_DRIFT || 'true').trim().toLowerCase() !== 'false',
    particles,
    controls:
      (config.HELIX_CONTROLS || 'false').trim().toLowerCase() === 'true',
  };
}

/**
 * Split BIO_LONG into a lede plus body paragraphs.
 *
 * Paragraphs are separated by a blank line. Both real newlines and the
 * two-character escape sequence "\n" are accepted, because docker-compose
 * environment values are commonly written on a single line.
 *
 * Returns null when there is no long bio, which is the signal that the
 * avatar should stay non-interactive.
 */
export function parseBio(raw: string | undefined): BioContent | null {
  if (!raw) return null;
  const paragraphs = raw
    .replace(/\\n/g, '\n')
    .split(/\n\s*\n/)
    .map(p => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return null;
  return { lede: paragraphs[0], body: paragraphs.slice(1) };
}

/**
 * Split BIO_TAGS into trimmed, non-empty chips.
 */
export function parseBioTags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);
}
