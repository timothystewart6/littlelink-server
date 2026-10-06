import {
  getHelixOptions,
  isHelixLayout,
  parseBio,
  parseBioTags,
} from '../../config/helixConfig';
import { getRuntimeConfig } from '../../config/runtimeConfig';

const cfg = (env: Record<string, string | undefined>) => getRuntimeConfig(env);

describe('isHelixLayout', () => {
  it('is off by default so the stock layout is unchanged', () => {
    expect(isHelixLayout(cfg({}))).toBe(false);
  });

  it('accepts LAYOUT=dna in any case, with surrounding whitespace', () => {
    expect(isHelixLayout(cfg({ LAYOUT: 'dna' }))).toBe(true);
    expect(isHelixLayout(cfg({ LAYOUT: 'DNA' }))).toBe(true);
    expect(isHelixLayout(cfg({ LAYOUT: ' Dna ' }))).toBe(true);
  });

  it('rejects anything else', () => {
    expect(isHelixLayout(cfg({ LAYOUT: 'list' }))).toBe(false);
    expect(isHelixLayout(cfg({ LAYOUT: 'helix' }))).toBe(false);
  });
});

describe('getHelixOptions', () => {
  it('returns documented defaults when nothing is set', () => {
    expect(getHelixOptions(cfg({}))).toEqual({
      style: 'bio',
      turns: 2,
      radius: 172,
      rise: 90,
      drift: true,
      particles: 'subtle',
      controls: false,
    });
  });

  it('reads each supported style', () => {
    expect(getHelixOptions(cfg({ HELIX_STYLE: 'chroma' })).style).toBe(
      'chroma',
    );
    expect(getHelixOptions(cfg({ HELIX_STYLE: 'CLINICAL' })).style).toBe(
      'clinical',
    );
  });

  it('falls back to the default style for an unknown value', () => {
    expect(getHelixOptions(cfg({ HELIX_STYLE: 'neon' })).style).toBe('bio');
  });

  it('clamps numeric options into their supported ranges', () => {
    const low = getHelixOptions(
      cfg({ HELIX_TURNS: '0', HELIX_RADIUS: '10', HELIX_RISE: '1' }),
    );
    expect(low).toMatchObject({ turns: 1, radius: 90, rise: 50 });

    const high = getHelixOptions(
      cfg({ HELIX_TURNS: '99', HELIX_RADIUS: '9000', HELIX_RISE: '900' }),
    );
    expect(high).toMatchObject({ turns: 6, radius: 320, rise: 190 });
  });

  it('ignores values that are not numbers', () => {
    expect(getHelixOptions(cfg({ HELIX_TURNS: 'two' })).turns).toBe(2);
  });

  it('reads the particle density, ignoring unknown values', () => {
    expect(getHelixOptions(cfg({ HELIX_PARTICLES: 'rich' })).particles).toBe(
      'rich',
    );
    expect(getHelixOptions(cfg({ HELIX_PARTICLES: 'OFF' })).particles).toBe(
      'off',
    );
    expect(getHelixOptions(cfg({ HELIX_PARTICLES: 'lots' })).particles).toBe(
      'subtle',
    );
  });

  it('only enables the control panel for an explicit true', () => {
    expect(getHelixOptions(cfg({ HELIX_CONTROLS: 'true' })).controls).toBe(
      true,
    );
    expect(getHelixOptions(cfg({ HELIX_CONTROLS: 'TRUE' })).controls).toBe(
      true,
    );
    expect(getHelixOptions(cfg({ HELIX_CONTROLS: 'yes' })).controls).toBe(
      false,
    );
    expect(getHelixOptions(cfg({})).controls).toBe(false);
  });

  it('only disables drift for an explicit false', () => {
    expect(getHelixOptions(cfg({ HELIX_DRIFT: 'false' })).drift).toBe(false);
    expect(getHelixOptions(cfg({ HELIX_DRIFT: 'False' })).drift).toBe(false);
    expect(getHelixOptions(cfg({ HELIX_DRIFT: 'yes' })).drift).toBe(true);
    expect(getHelixOptions(cfg({})).drift).toBe(true);
  });
});

describe('parseBio', () => {
  it('returns null when BIO_LONG is unset or blank', () => {
    expect(parseBio(undefined)).toBeNull();
    expect(parseBio('')).toBeNull();
    expect(parseBio('   \n\n  ')).toBeNull();
  });

  it('uses the first paragraph as the lede', () => {
    const bio = parseBio('One.\n\nTwo.\n\nThree.');
    expect(bio).toEqual({ lede: 'One.', body: ['Two.', 'Three.'] });
  });

  it('accepts escaped newlines, as written in a compose file', () => {
    const bio = parseBio('One.\\n\\nTwo.');
    expect(bio).toEqual({ lede: 'One.', body: ['Two.'] });
  });

  it('joins soft-wrapped lines within a paragraph', () => {
    const bio = parseBio('A sentence\nwrapped over lines.\n\nNext.');
    expect(bio?.lede).toBe('A sentence wrapped over lines.');
  });

  it('handles a single paragraph', () => {
    expect(parseBio('Only this.')).toEqual({ lede: 'Only this.', body: [] });
  });
});

describe('parseBioTags', () => {
  it('splits, trims and drops empties', () => {
    expect(parseBioTags(' Engineer , Speaker ,, Photographer ')).toEqual([
      'Engineer',
      'Speaker',
      'Photographer',
    ]);
  });

  it('returns an empty list when unset', () => {
    expect(parseBioTags(undefined)).toEqual([]);
    expect(parseBioTags('  ')).toEqual([]);
  });
});
