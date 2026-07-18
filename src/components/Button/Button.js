import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Determine the CSS shadow class based on drop shadow config.
 * @param {'light'|'medium'|'heavy'|undefined} dropShadow
 * @returns {string}
 */
function addShadow(dropShadow) {
  switch (dropShadow) {
    case 'light':
      return ' box-shadow-light';
    case 'medium':
      return ' box-shadow-medium';
    case 'heavy':
      return ' box-shadow-heavy';
    default:
      return '';
  }
}

function Button(props) {
  const {
    name,
    href,
    displayName,
    logo,
    styles,
    alt,
    icon,
    rels,
    buttonTarget,
    dropShadow,
  } = props;

  const className =
    (styles ? 'button' : `button button-${name}`) + addShadow(dropShadow);
  const target = buttonTarget || '_blank';
  const rel = rels || 'noopener noreferrer';
  const eventName = name ? `${name}-button` : undefined;

  return (
    <a
      className={className}
      href={href}
      target={target}
      rel={rel}
      data-analytics-event={eventName}
      style={styles || undefined}
      title={alt || displayName}
    >
      {logo && <img className="icon" src={logo} alt={`${displayName} logo`} />}

      {icon && <FontAwesomeIcon className="icon" icon={icon.split(' ')} />}

      {displayName}
    </a>
  );
}

export default Button;
