import {
  createField,
  moteBrightness,
  stepField,
  tryFireSpark,
} from '../../../components/Helix/helixParticles';

const bounds = { band: 600, reach: 8 };

describe('createField', () => {
  it('is empty when particles are off', () => {
    const field = createField('off', bounds);
    expect(field.motes).toHaveLength(0);
  });

  it('grows with density', () => {
    expect(createField('rich', bounds).motes.length).toBeGreaterThan(
      createField('subtle', bounds).motes.length,
    );
  });

  it('keeps every mote inside the band', () => {
    for (const m of createField('rich', bounds).motes) {
      expect(Math.abs(m.y)).toBeLessThanOrEqual(bounds.band);
      expect(m.orbit).toBeGreaterThan(0);
    }
  });

  /*
   * Deriving several properties from one index with a shared golden-ratio
   * sequence correlates them, which lays the field out along a diagonal
   * instead of filling the volume. This is the regression guard for that.
   */
  it('does not correlate orbit radius with height', () => {
    const motes = createField('rich', bounds).motes;
    const n = motes.length;
    const meanOrbit = motes.reduce((s, m) => s + m.orbit, 0) / n;
    const meanY = motes.reduce((s, m) => s + m.y, 0) / n;

    let cov = 0;
    let varOrbit = 0;
    let varY = 0;
    for (const m of motes) {
      const a = m.orbit - meanOrbit;
      const b = m.y - meanY;
      cov += a * b;
      varOrbit += a * a;
      varY += b * b;
    }
    const r = cov / Math.sqrt(varOrbit * varY);
    expect(Math.abs(r)).toBeLessThan(0.25);
  });

  it('is deterministic, so the field is the same on every load', () => {
    const a = createField('subtle', bounds).motes.map(m => m.angle);
    const b = createField('subtle', bounds).motes.map(m => m.angle);
    expect(a).toEqual(b);
  });
});

describe('stepField', () => {
  it('wraps motes back into the band rather than losing them', () => {
    const field = createField('subtle', bounds);
    for (let i = 0; i < 400; i += 1) {
      stepField(field, 0.05, 0.4, 90, bounds, () => 1);
    }
    for (const m of field.motes) {
      expect(Math.abs(m.y)).toBeLessThanOrEqual(bounds.band + 1);
    }
  });

  it('swirls motes with the scroll', () => {
    const field = createField('subtle', bounds);
    const before = field.motes[0].angle;
    stepField(field, 0, 1, 90, bounds, () => 1);
    expect(field.motes[0].angle).not.toBeCloseTo(before, 6);
  });

  it('spawns pulses up to the density limit and retires them', () => {
    const field = createField('rich', bounds);
    for (let i = 0; i < 200; i += 1) {
      stepField(field, 0.016, 0, 90, bounds, () => 0.01);
    }
    expect(field.pulses.length).toBeGreaterThan(0);
    expect(field.pulses.length).toBeLessThanOrEqual(6);
    for (const p of field.pulses) {
      expect(Math.abs(p.d)).toBeLessThanOrEqual(bounds.reach);
    }
  });

  it('never spawns pulses when particles are off', () => {
    const field = createField('off', bounds);
    for (let i = 0; i < 200; i += 1) {
      stepField(field, 0.016, 0, 90, bounds, () => 0.01);
    }
    expect(field.pulses).toHaveLength(0);
  });

  it('expires sparks', () => {
    const field = createField('subtle', bounds);
    field.sparks.push({ from: 0, to: 1, life: 1, tint: 0 });
    stepField(field, 1, 0, 90, bounds, () => 1);
    expect(field.sparks).toHaveLength(0);
  });
});

describe('tryFireSpark', () => {
  const near = [
    { px: 100, py: 100, visible: true },
    { px: 110, py: 105, visible: true },
  ];

  it('links two visible motes that are close together', () => {
    const field = createField('subtle', bounds);
    tryFireSpark(field, near, 60, () => 0);
    expect(field.sparks).toHaveLength(1);
  });

  it('ignores motes that are too far apart', () => {
    const field = createField('subtle', bounds);
    tryFireSpark(
      field,
      [
        { px: 0, py: 0, visible: true },
        { px: 900, py: 900, visible: true },
      ],
      60,
      () => 0,
    );
    expect(field.sparks).toHaveLength(0);
  });

  it('never fires when particles are off', () => {
    const field = createField('off', bounds);
    tryFireSpark(field, near, 60, () => 0);
    expect(field.sparks).toHaveLength(0);
  });

  it('caps concurrent sparks', () => {
    const field = createField('subtle', bounds);
    for (let i = 0; i < 20; i += 1) tryFireSpark(field, near, 60, () => 0);
    expect(field.sparks.length).toBeLessThanOrEqual(3);
  });
});

describe('moteBrightness', () => {
  it('stays within the unit range as the phase advances', () => {
    const m = createField('subtle', bounds).motes[0];
    for (let i = 0; i < 50; i += 1) {
      m.pulse = i * 0.4;
      const b = moteBrightness(m);
      expect(b).toBeGreaterThanOrEqual(0);
      expect(b).toBeLessThanOrEqual(1);
    }
  });
});
