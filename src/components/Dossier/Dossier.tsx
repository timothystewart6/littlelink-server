'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { BioContent } from '../../config/helixConfig';

import './Dossier.css';

export interface DossierProps {
  /** Heading for the panel, normally the site owner's name. */
  name?: string;
  /** Parsed BIO_LONG content. */
  bio: BioContent;
  /** Short role chips parsed from BIO_TAGS. */
  tags?: string[];
  /** Optional link shown as the closing call to action. */
  ctaHref?: string;
  ctaLabel?: string;
  /** The avatar, which becomes the trigger. */
  children: React.ReactNode;
}

/**
 * A long-form profile panel opened from the avatar.
 *
 * Rendered only when BIO_LONG is set. Without it the avatar stays a plain
 * image, exactly as before.
 */
function Dossier({
  name,
  bio,
  tags = [],
  ctaHref,
  ctaLabel,
  children,
}: DossierProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    if (bodyRef.current) bodyRef.current.scrollTop = 0;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) triggerRef.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      <span className="dossier-trigger">
        <button
          type="button"
          ref={triggerRef}
          className="dossier-trigger__button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={name ? `About ${name}` : 'About'}
          onClick={() => setOpen(true)}
        >
          {children}
          <span className="dossier-trigger__badge" aria-hidden="true">
            i
          </span>
        </button>
      </span>

      <div
        className={`dossier-scrim${open ? ' is-open' : ''}`}
        onClick={close}
        data-helix-overlay=""
        aria-hidden="true"
      />

      <div
        className={`dossier${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={name || 'Profile'}
        aria-hidden={!open}
        data-helix-overlay=""
      >
        <button
          type="button"
          ref={closeRef}
          className="dossier__close"
          onClick={close}
          aria-label="Close"
        >
          &#215;
        </button>

        <div className="dossier__top">
          <span className="dossier__eyebrow">Profile</span>
          {name && <h2 className="dossier__name">{name}</h2>}
          {tags.length > 0 && (
            <ul className="dossier__tags">
              {tags.map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="dossier__body" ref={bodyRef}>
          <p className="dossier__lede">{bio.lede}</p>
          {bio.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          {ctaHref && (
            <a
              className="dossier__cta"
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctaLabel || 'Get in touch'}
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default Dossier;
