import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { DropShadow } from '../../config/runtimeConfig';

export interface ButtonProps {
  name?: string;
  href?: string;
  displayName?: string;
  logo?: string;
  styles?: React.CSSProperties;
  alt?: string;
  icon?: string;
  rels?: string;
  buttonTarget?: string;
  dropShadow?: DropShadow;
  order?: number;
}

/**
 * Determine the CSS shadow class based on drop shadow config.
 */
function addShadow(dropShadow: DropShadow | undefined): string {
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

function Button(props: ButtonProps) {
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

      {icon && (
        <FontAwesomeIcon className="icon" icon={icon.split(' ') as IconProp} />
      )}

      {displayName}
    </a>
  );
}

export default Button;
