/**
 * The living field around the helix.
 *
 * Three effects, each cheap, each doing a different job:
 *
 * - **Motes** orbit the same vertical axis as the helix on their own radii and
 *   at their own rates. Because they sit at every depth, some pass in front of
 *   the strand and some behind it, which is what actually communicates that the
 *   strand is a volume rather than a flat ribbon.
 * - **Pulses** run along a backbone like a signal down an axon, brightest at
 *   the head with a short tail behind.
 * - **Sparks** arc briefly between two motes that drift close together, flash,
 *   and fade — the synapse firing.
 *
 * Everything here is plain state plus an update step, so the geometry can be
 * tested without a canvas.
 */

import type { ParticleDensity } from '../../config/helixConfig';

export interface Mote {
  /** Orbit radius, as a multiple of the helix radius. */
  orbit: number;
  /** Current angle around the axis, in radians. */
  angle: number;
  /** Angular velocity, in radians per second. Sign sets the direction. */
  spin: number;
  /** Vertical position relative to the centre of the viewport, in pixels. */
  y: number;
  /** Vertical drift, in pixels per second. */
  rise: number;
  /** How strongly this mote follows the scroll, 0 to 1. */
  parallax: number;
  /** Index into the palette's neon ramp. */
  tint: number;
  /** Base radius on screen, in pixels. */
  size: number;
  /** Phase of the brightness pulse, in radians. */
  pulse: number;
  /** Rate of the brightness pulse, in radians per second. */
  pulseRate: number;
}

export interface Pulse {
  /** Position along the strand, in base-pair units from the centre. */
  d: number;
  /** Travel speed, in base pairs per second. Sign sets the direction. */
  speed: number;
  strand: 0 | 1;
  /** Remaining life, 0 to 1. */
  life: number;
  tint: number;
}

export interface Spark {
  from: number;
  to: number;
  /** Remaining life, 0 to 1. */
  life: number;
  tint: number;
}

export interface ParticleField {
  motes: Mote[];
  pulses: Pulse[];
  sparks: Spark[];
  density: ParticleDensity;
}

export interface FieldBounds {
  /** Half-height of the band motes live in, in pixels. */
  band: number;
  /** Furthest base-pair distance a pulse travels before dying. */
  reach: number;
}

const COUNTS: Record<ParticleDensity, { motes: number; pulses: number }> = {
  off: { motes: 0, pulses: 0 },
  subtle: { motes: 90, pulses: 3 },
  rich: { motes: 190, pulses: 6 },
};

/**
 * Small seeded generator (mulberry32).
 *
 * Deterministic, so the field looks the same on every load, but genuinely
 * decorrelated between properties. Deriving several properties from one index
 * with a shared golden-ratio sequence correlates them, which lays the whole
 * field out along a diagonal instead of filling the volume.
 */
function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Build a field sized for the requested density.
 */
export function createField(
  density: ParticleDensity,
  bounds: FieldBounds,
): ParticleField {
  const { motes: moteCount } = COUNTS[density];
  const motes: Mote[] = [];
  const rnd = seeded(0x5eed1e);

  for (let i = 0; i < moteCount; i += 1) {
    // Radii span from inside the helix to well outside it, so the field reads
    // as a volume the strand sits within rather than a halo around it. The
    // square root biases towards the outside, which keeps the middle of the
    // frame clear for the links.
    const outward = Math.sqrt(rnd());
    const orbit = 0.3 + outward * 2.3;
    motes.push({
      orbit,
      angle: rnd() * Math.PI * 2,
      // Wider orbits turn more slowly, as an orbit should.
      spin: ((0.1 + rnd() * 0.24) * (rnd() < 0.34 ? -1 : 1)) / orbit,
      y: (rnd() * 2 - 1) * bounds.band,
      rise: 4 + rnd() * 26,
      parallax: 0.25 + outward * 0.6,
      tint: i % 5,
      size: 1.2 + rnd() * rnd() * 3,
      pulse: rnd() * Math.PI * 2,
      pulseRate: 0.7 + rnd() * 2.4,
    });
  }

  return { motes, pulses: [], sparks: [], density };
}

/**
 * Advance the field by one frame.
 *
 * `scrollDelta` is the change in scroll position in base-pair units, which
 * both swirls the motes and drags them vertically at their own parallax rate.
 */
export function stepField(
  field: ParticleField,
  dt: number,
  scrollDelta: number,
  rise: number,
  bounds: FieldBounds,
  random: () => number = Math.random,
): void {
  const span = bounds.band * 2;

  for (const m of field.motes) {
    m.angle += m.spin * dt + scrollDelta * 0.9 * m.parallax;
    m.y += m.rise * dt - scrollDelta * rise * m.parallax;
    m.pulse += m.pulseRate * dt;
    // Wrap through the band so the field never empties out.
    if (m.y > bounds.band) m.y -= span;
    else if (m.y < -bounds.band) m.y += span;
  }

  const wanted = COUNTS[field.density].pulses;
  for (let i = field.pulses.length - 1; i >= 0; i -= 1) {
    const p = field.pulses[i];
    p.d += p.speed * dt;
    p.life -= dt * 0.32;
    if (p.life <= 0 || Math.abs(p.d) > bounds.reach) field.pulses.splice(i, 1);
  }
  if (field.pulses.length < wanted && random() < 0.035) {
    const downward = random() < 0.5;
    field.pulses.push({
      d: downward ? -bounds.reach : bounds.reach,
      speed: (downward ? 1 : -1) * (1.6 + random() * 2.4),
      strand: random() < 0.5 ? 0 : 1,
      life: 1,
      tint: Math.floor(random() * 5),
    });
  }

  for (let i = field.sparks.length - 1; i >= 0; i -= 1) {
    field.sparks[i].life -= dt * 2.6;
    if (field.sparks[i].life <= 0) field.sparks.splice(i, 1);
  }
}

/**
 * Try to fire a synapse between two motes that are currently close together.
 *
 * Called with already-projected screen positions so proximity means what the
 * viewer actually sees, not what is close in three dimensions but far apart on
 * screen.
 */
export function tryFireSpark(
  field: ParticleField,
  positions: { px: number; py: number; visible: boolean }[],
  maxDistance: number,
  random: () => number = Math.random,
): void {
  if (field.density === 'off' || field.sparks.length >= 3) return;
  if (random() > 0.06) return;

  const n = positions.length;
  if (n < 2) return;

  const a = Math.floor(random() * n);
  if (!positions[a]?.visible) return;

  let best = -1;
  let bestDistance = maxDistance;
  for (let b = 0; b < n; b += 1) {
    if (b === a || !positions[b].visible) continue;
    const dx = positions[a].px - positions[b].px;
    const dy = positions[a].py - positions[b].py;
    const distance = Math.hypot(dx, dy);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = b;
    }
  }

  if (best >= 0) {
    field.sparks.push({
      from: a,
      to: best,
      life: 1,
      tint: field.motes[a]?.tint ?? 0,
    });
  }
}

/** Brightness of a mote right now, 0 to 1. */
export function moteBrightness(m: Mote): number {
  return 0.55 + 0.45 * Math.sin(m.pulse);
}
