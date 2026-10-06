import {
  clamp,
  place,
  project,
  smoothstep,
  strandPoint,
  twistPerStep,
  wrap,
  type Viewport,
} from '../../../components/Helix/helixMath';

const view: Viewport = {
  radius: 170,
  rise: 90,
  fade: 500,
  depth: 300,
  perspective: 1400,
};

describe('clamp and smoothstep', () => {
  it('clamps to the given bounds', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(50, 0, 10)).toBe(10);
    expect(clamp(4, 0, 10)).toBe(4);
  });

  it('smoothsteps between the edges', () => {
    expect(smoothstep(0, 1, -1)).toBe(0);
    expect(smoothstep(0, 1, 2)).toBe(1);
    expect(smoothstep(0, 1, 0.5)).toBeCloseTo(0.5, 6);
  });
});

describe('wrap', () => {
  it('maps a distance into the half-open range around zero', () => {
    expect(wrap(0, 21)).toBe(0);
    expect(wrap(3, 21)).toBe(3);
    expect(wrap(-3, 21)).toBe(-3);
  });

  it('brings a button that walks off one end back at the other', () => {
    expect(wrap(20, 21)).toBe(-1);
    expect(wrap(-20, 21)).toBe(1);
    expect(wrap(21, 21)).toBe(0);
  });

  it('is periodic in the list length', () => {
    for (const d of [-7.3, -0.4, 2.5, 9.9]) {
      expect(wrap(d + 21, 21)).toBeCloseTo(wrap(d, 21), 10);
      expect(wrap(d - 42, 21)).toBeCloseTo(wrap(d, 21), 10);
    }
  });

  it('is safe with an empty list', () => {
    expect(wrap(4, 0)).toBe(0);
  });
});

describe('twistPerStep', () => {
  it('spreads the requested turns across the whole list', () => {
    expect(twistPerStep(2, 21)).toBeCloseTo((2 * Math.PI * 2) / 21, 10);
  });

  /*
   * The seamless loop depends on this: wrapping shifts a button by a whole
   * list length, so the twist across that shift has to be a whole number of
   * revolutions or the strand would visibly jump at the wrap point.
   */
  it('makes a full list length a whole number of revolutions', () => {
    for (const turns of [1, 2, 3, 4, 5, 6]) {
      for (const count of [3, 7, 21, 40]) {
        const total = twistPerStep(turns, count) * count;
        const revolutions = total / (2 * Math.PI);
        expect(revolutions).toBeCloseTo(Math.round(revolutions), 10);
      }
    }
  });
});

describe('place', () => {
  const twist = twistPerStep(2, 21);

  it('leaves the centred base pair face-on and fully opaque', () => {
    const p = place(0, twist, view);
    expect(p.y).toBe(0);
    expect(p.angle).toBe(0);
    expect(p.z).toBeCloseTo(0, 10);
    expect(p.fade).toBe(1);
  });

  it('is symmetric above and below the centre', () => {
    const up = place(-3, twist, view);
    const down = place(3, twist, view);
    expect(up.y).toBeCloseTo(-down.y, 10);
    expect(up.z).toBeCloseTo(down.z, 10);
    expect(up.fade).toBeCloseTo(down.fade, 10);
  });

  it('recedes and fades out towards the fade distance', () => {
    const near = place(1, twist, view);
    const far = place(5, twist, view);
    expect(far.z).toBeLessThan(near.z);
    expect(far.fade).toBeLessThan(near.fade);
    expect(place(20, twist, view).fade).toBe(0);
  });
});

describe('strandPoint', () => {
  const twist = twistPerStep(2, 21);

  it('puts the two strands at opposite ends of a rung', () => {
    const a = strandPoint(1.3, 0, twist, view);
    const b = strandPoint(1.3, 1, twist, view);
    expect(a.x).toBeCloseTo(-b.x, 10);
    expect(a.y).toBeCloseTo(b.y, 10);
  });

  /*
   * CSS rotateY(a) sends a rung's local +x end to z = -x·sin a. The backbone
   * has to agree, or the near edge of a tablet shrinks as it approaches the
   * viewer while the strand beside it brightens.
   */
  it('matches the CSS rotateY depth convention', () => {
    const a = Math.PI / 4;
    const d = a / twist;
    const point = strandPoint(d, 0, twist, view);
    const expectedZ = -view.radius * Math.sin(a) + place(d, twist, view).z;
    expect(point.z).toBeCloseTo(expectedZ, 8);
    expect(point.x).toBeCloseTo(view.radius * Math.cos(a), 8);
  });

  it('reports the nearer strand as nearer', () => {
    const d = -Math.PI / 4 / twist; // rotated so strand 0 comes forward
    const near = strandPoint(d, 0, twist, view);
    const far = strandPoint(d, 1, twist, view);
    expect(near.z).toBeGreaterThan(far.z);
    expect(near.near).toBeGreaterThan(far.near);
  });

  it('keeps the nearness cue inside the unit range', () => {
    for (let d = -10; d <= 10; d += 0.37) {
      for (const strand of [0, 1] as const) {
        const { near } = strandPoint(d, strand, twist, view);
        expect(near).toBeGreaterThanOrEqual(0);
        expect(near).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe('project', () => {
  it('leaves a point on the projection plane untouched', () => {
    expect(project(50, -20, 0, 100, 200, 1400)).toEqual({
      px: 150,
      py: 180,
      scale: 1,
    });
  });

  it('magnifies what is nearer and shrinks what is further', () => {
    expect(project(10, 0, 400, 0, 0, 1400).scale).toBeGreaterThan(1);
    expect(project(10, 0, -400, 0, 0, 1400).scale).toBeLessThan(1);
  });
});
