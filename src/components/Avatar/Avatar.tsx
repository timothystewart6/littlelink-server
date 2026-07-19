import React from 'react';
import type { DropShadow } from '../../config/runtimeConfig';

import './Avatar.css';

export interface AvatarProps {
  src?: string;
  srcSet?: string;
  alt?: string;
  avatarSize?: string;
  dropShadow?: DropShadow;
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

function Avatar(props: AvatarProps) {
  const { src, srcSet, alt, avatarSize, dropShadow } = props;

  return (
    <img
      className={'avatar' + addShadow(dropShadow)}
      src={src}
      srcSet={srcSet}
      alt={alt}
      style={avatarSize ? { width: avatarSize, height: avatarSize } : {}}
    />
  );
}

export default Avatar;
