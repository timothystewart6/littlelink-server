import React from 'react';
import type { RuntimeConfig, DropShadow } from '../../config/runtimeConfig';
import {
  getHelixOptions,
  isHelixLayout,
  parseBio,
  parseBioTags,
} from '../../config/helixConfig';
import Avatar from '../Avatar/Avatar';
import Dossier from '../Dossier/Dossier';
import Helix from '../Helix/Helix';
import Share from '../Share/Share';
import Sort from '../Sort/Sort';

export interface ShellProps {
  config: RuntimeConfig;
  dropShadow?: DropShadow;
  /** The rendered link buttons, passed straight through so the layout that
   *  receives them can still read each child's `order` prop. */
  children?: React.ReactNode;
}

/**
 * Page chrome around the link buttons.
 *
 * Chooses between the stock vertical list and the DNA helix, and wraps the
 * avatar in a profile panel when BIO_LONG is set. The buttons themselves are
 * identical in both layouts.
 */
function Shell({ config, dropShadow, children }: ShellProps) {
  const bio = parseBio(config.BIO_LONG);
  const helix = isHelixLayout(config);

  const avatar = (
    <Avatar
      src={config.AVATAR_URL}
      srcSet={config.AVATAR_2X_URL}
      alt={config.AVATAR_ALT}
      avatarSize={config.AVATAR_SIZE}
      dropShadow={dropShadow}
    />
  );

  const portrait = bio ? (
    <Dossier
      name={config.NAME}
      bio={bio}
      tags={parseBioTags(config.BIO_TAGS)}
      ctaHref={config.LINKED_IN}
      ctaLabel="Connect on LinkedIn"
    >
      {avatar}
    </Dossier>
  ) : (
    avatar
  );

  const footer = (
    <>
      {config.FOOTER}
      {config.SHARE && config.OG_TITLE && config.OG_DESCRIPTION && (
        <>
          <br />
          <Share
            url={config.SHARE}
            title={config.OG_TITLE}
            text={config.OG_DESCRIPTION}
          />
        </>
      )}
    </>
  );

  if (helix) {
    return (
      <>
        <header className="hx-specimen">
          {portrait}
          <div>
            {config.NAME && <h1>{config.NAME}</h1>}
            {config.BIO && <p>{config.BIO}</p>}
          </div>
        </header>
        <Helix options={getHelixOptions(config)}>{children}</Helix>
        {config.FOOTER && <p className="hx-footer">{footer}</p>}
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="column" style={{ marginTop: '12%' }}>
            {portrait}
            {config.NAME && <h1>{config.NAME}</h1>}
            {config.BIO && <p>{config.BIO}</p>}
            <Sort>{children}</Sort>
            <div>
              <p className="footer">{footer}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shell;
