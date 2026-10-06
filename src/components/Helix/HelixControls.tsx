'use client';

import React, { useEffect, useRef, useState } from 'react';
import type {
  HelixOptions,
  HelixStyle,
  ParticleDensity,
} from '../../config/helixConfig';

export interface HelixControlsProps {
  /** Starting values, taken from the environment. */
  initial: HelixOptions;
  /** Applies a change to the running scene. */
  onChange: (patch: Partial<HelixOptions>) => void;
}

const STYLE_LABELS: [HelixStyle, string][] = [
  ['bio', 'Bio'],
  ['chroma', 'Chroma'],
  ['clinical', 'Clinical'],
];

const DENSITY_LABELS: [ParticleDensity, string][] = [
  ['off', 'Off'],
  ['subtle', 'Subtle'],
  ['rich', 'Rich'],
];

/**
 * The sequencer: a small panel of live scene controls behind a gear button.
 *
 * Nothing here is persisted. Reloading the page returns every setting to
 * whatever the environment configured, so a visitor can play without changing
 * what anyone else sees.
 */
function HelixControls({ initial, onChange }: HelixControlsProps) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<HelixOptions>(initial);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  function set<K extends keyof HelixOptions>(key: K, value: HelixOptions[K]) {
    setValues(previous => ({ ...previous, [key]: value }));
    onChange({ [key]: value } as Partial<HelixOptions>);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="hx-controls" data-helix-overlay="">
      <button
        type="button"
        ref={toggleRef}
        className="hx-controls__toggle"
        aria-expanded={open}
        aria-controls="hx-sequencer"
        aria-label={open ? 'Close scene controls' : 'Open scene controls'}
        onClick={() => setOpen(v => !v)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.5-2-3.4-2.3 1a7.7 7.7 0 0 0-1.7-1l-.4-2.5h-4l-.4 2.500a7.7 7.7 0 0 0-1.7 1l-2.3-1-2 3.4L6.6 11a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7.7 7.7 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7.7 7.7 0 0 0 1.7-1l2.3 1 2-3.4-2-1.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        id="hx-sequencer"
        className={`hx-panel${open ? ' is-open' : ''}`}
        ref={panelRef}
        hidden={!open}
      >
        <h2 className="hx-panel__title">Sequencer</h2>

        <div className="hx-panel__row">
          <span className="hx-panel__label">Render</span>
          <div className="hx-panel__chips">
            {STYLE_LABELS.map(([value, label]) => (
              <button
                type="button"
                key={value}
                className="hx-chip"
                aria-pressed={values.style === value}
                onClick={() => set('style', value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="hx-panel__row">
          <span className="hx-panel__label">Particles</span>
          <div className="hx-panel__chips">
            {DENSITY_LABELS.map(([value, label]) => (
              <button
                type="button"
                key={value}
                className="hx-chip"
                aria-pressed={values.particles === value}
                onClick={() => set('particles', value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="hx-panel__row">
          <span className="hx-panel__label">
            Twist
            <span className="hx-panel__value">
              {values.turns} {values.turns === 1 ? 'turn' : 'turns'}
            </span>
          </span>
          <div className="hx-panel__chips">
            {[1, 2, 3, 4].map(turns => (
              <button
                type="button"
                key={turns}
                className="hx-chip"
                aria-pressed={values.turns === turns}
                onClick={() => set('turns', turns)}
              >
                {turns}
              </button>
            ))}
          </div>
        </div>

        <div className="hx-panel__row">
          <label className="hx-panel__label" htmlFor="hx-radius">
            Radius
            <span className="hx-panel__value">{values.radius}</span>
          </label>
          <input
            id="hx-radius"
            type="range"
            min="110"
            max="260"
            value={values.radius}
            onChange={e => set('radius', Number(e.target.value))}
          />
        </div>

        <div className="hx-panel__row">
          <label className="hx-panel__label" htmlFor="hx-rise">
            Rise
            <span className="hx-panel__value">{values.rise}</span>
          </label>
          <input
            id="hx-rise"
            type="range"
            min="62"
            max="150"
            value={values.rise}
            onChange={e => set('rise', Number(e.target.value))}
          />
        </div>

        <div className="hx-panel__row">
          <span className="hx-panel__label">Idle drift</span>
          <div className="hx-panel__chips">
            <button
              type="button"
              className="hx-chip"
              aria-pressed={values.drift}
              onClick={() => set('drift', true)}
            >
              Alive
            </button>
            <button
              type="button"
              className="hx-chip"
              aria-pressed={!values.drift}
              onClick={() => set('drift', false)}
            >
              Still
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelixControls;
