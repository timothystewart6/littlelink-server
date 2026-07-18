'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Share(props) {
  const { url, title, text } = props;

  const handleSharing = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          url,
          title,
          text,
        });
      } catch {
        // User cancelled or sharing failed silently.
      }
    }
  };

  return (
    <a className={'button'} rel="noopener noreferrer" onClick={handleSharing}>
      <FontAwesomeIcon className="icon" icon={['fas', 'fa-share-nodes']} />
    </a>
  );
}

export default Share;
