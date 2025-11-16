import React, { memo } from 'react';
import { string, object } from 'prop-types';
import { trackGoogleEvent } from '../../analytics/google';
import { runtimeConfig } from '../../config';
import { trackUmamiEvent } from '../../analytics/umami';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trackMatomoEvent } from '../../analytics/matomo';
import { addShadow } from '../../utils';

function Button(props) {
  const { name, href, displayName, logo, styles, alt, icon, rels } = props;

  const handleClick = () => {
    const eventName = `${name}-button`;

    if (runtimeConfig?.GA_TRACKING_ID) {
      trackGoogleEvent(eventName);
    }
    if (runtimeConfig?.UMAMI_WEBSITE_ID && runtimeConfig?.UMAMI_APP_URL) {
      trackUmamiEvent(eventName);
    }
    if (runtimeConfig?.MATOMO_SITE_ID && runtimeConfig?.MATOMO_URL) {
      trackMatomoEvent(eventName);
    }
  };

  return (
    <>
      <a
        className={(styles ? 'button' : `button button-${name}`) + addShadow()}
        href={href}
        target={runtimeConfig?.BUTTON_TARGET || '_blank'}
        rel={rels ? rels : 'noopener noreferrer'}
        onClick={handleClick}
        style={styles ? styles : undefined}
        title={alt || displayName}
      >
        {logo && (
          <img className="icon" src={logo} alt={`${displayName} logo`} />
        )}

        {icon && <FontAwesomeIcon className="icon" icon={icon.split(' ')} />}

        {displayName}
      </a>
    </>
  );
}

export default memo(Button);

Button.propType = {
  src: string.isRequired,
  alt: string.isRequired,
  displayName: string.isRequired,
  href: string.isRequired,
  name: string.isRequired,
  logo: string,
  icon: string,
  styles: object,
  rels: string,
};
