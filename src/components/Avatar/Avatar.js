import React, { memo } from 'react';
import { string } from 'prop-types';
import { addShadow } from '../../utils';
import { runtimeConfig } from '../../config';

import './Avatar.css';

// Avatar component that renders an image with shadow.
function Avatar(props) {
  // Props of the component.
  const { src, srcSet, alt } = props;

  // Get avatar size from runtime config.
  const avatarSize = runtimeConfig.AVATAR_SIZE || null;

  // Render the image with shadow.
  return (
    <img
      className={'avatar' + addShadow()}
      src={src}
      srcSet={srcSet}
      alt={alt}
      style={avatarSize ? { width: avatarSize, height: avatarSize } : {}}
    />
  );
}

// Memoize the component to improve performance.
export default memo(Avatar);

Avatar.propType = {
  src: string,
  srcSet: string,
  alt: string,
};
