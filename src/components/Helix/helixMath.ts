/**
 * Pure geometry for the DNA helix layout.
 *
 * The helix performs a screw motion: it translates vertically and rotates
 * about its own axis at exactly the rate its pitch implies. Two consequences
 * follow, and both are deliberate.
 *
 * 1. The base pair nearest the centre of the viewport is always face-on and
 *    readable, because its rotation is measured from that centre.
 * 2. Because the rotation matches the pitch, the backbone is stationary in
 *    screen space while the nucleotides and the rungs slide along it. This is
 *    the barber-pole effect, and it is the physically correct result.
 *
 * Coordinate conventions match CSS 3D transforms: x grows to the right, y
 * grows downward, and +z points towards the viewer. A CSS `rotateY(a)` maps a
 * local point (x, 0, 0) to (x·cos a, 0, −x·sin a), so the backbone strand a
 * rung's right-hand end attaches to sits at z = −R·sin a. Getting that sign
 * wrong makes the near edge of a tablet shrink as it approaches the viewer.
 */

export interface Viewport {
  /** Half the helix's projected width, in CSS pixels. */
  radius: number;
  /** Vertical distance between base pairs, in CSS pixels. */
  rise: number;
  /** Distance at which a base pair has faded out entirely. */
  fade: number;
  /** How far the ends of the visible strand recede from the viewer. */
  depth: number;
  /** CSS perspective distance. */
  perspective: number;
}

export interface Placement {
  /** Vertical offset from the centre of the viewport, in CSS pixels. */
  y: number;
  /** Rotation about the helix axis, in radians. */
  angle: number;
  /** Depth offset applied to push distant base pairs away. */
  z: number;
  /** 0 at the centre of the viewport, 1 at the fade distance. */
  t: number;
  /** Opacity, reaching 0 before the base pair could reach the wrap point. */
  fade: number;
}

export function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

/** Hermite smoothstep between two edges. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Wrap a signed distance into [-count/2, count/2).
 *
 * This is what makes the list endless: a button that walks off one end
 * reappears at the other, and because the twist across a full list length is
 * a whole number of revolutions, its rotation is unchanged by the wrap.
 */
export function wrap(distance: number, count: number): number {
  if (count <= 0) return 0;
  const half = count / 2;
  return ((((distance + half) % count) + count) % count) - half;
}

/** Radians of twist between neighbouring base pairs. */
export function twistPerStep(turns: number, count: number): number {
  if (count <= 0) return 0;
  return (2 * Math.PI * turns) / count;
}

/**
 * Place a point on the helix at signed step distance `d` from the centre.
 */
export function place(d: number, twist: number, view: Viewport): Placement {
  const y = d * view.rise;
  const t = Math.min(1, Math.abs(y) / view.fade);
  return {
    y,
    angle: d * twist,
    z: -view.depth * Math.pow(t, 1.6),
    t,
    fade: 1 - smoothstep(0.56, 1, t),
  };
}

/**
 * Position of one backbone strand at a point on the helix.
 *
 * `strand` is 0 or 1; the two strands sit half a turn apart, which is what
 * puts them at opposite ends of every rung.
 */
export function strandPoint(
  d: number,
  strand: 0 | 1,
  twist: number,
  view: Viewport,
): { x: number; y: number; z: number; near: number } {
  const p = place(d, twist, view);
  const angle = p.angle + (strand ? Math.PI : 0);
  return {
    x: view.radius * Math.cos(angle),
    // Negated to match the CSS rotateY convention described above.
    z: -view.radius * Math.sin(angle) + p.z,
    y: p.y,
    // 0 when the point is at the far side of the axis, 1 when nearest.
    near: clamp(0.5 - Math.sin(angle) * 0.5, 0, 1),
  };
}

/**
 * Project a 3D point using the same perspective division the browser applies
 * to the transformed rung elements, so canvas and DOM stay registered.
 */
export function project(
  x: number,
  y: number,
  z: number,
  cx: number,
  cy: number,
  perspective: number,
): { px: number; py: number; scale: number } {
  const scale = perspective / (perspective - z);
  return { px: cx + x * scale, py: cy + y * scale, scale };
}
