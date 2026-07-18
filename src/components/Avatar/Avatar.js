import React from 'react';

import './Avatar.css';

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

// Avatar component that renders an image with shadow.
function Avatar(props) {
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
