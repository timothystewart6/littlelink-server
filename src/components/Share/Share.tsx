'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ShareProps {
  url?: string;
  title?: string;
  text?: string;
}

function Share(props: ShareProps) {
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
      <FontAwesomeIcon className="icon" icon={['fas', 'share-nodes']} />
    </a>
  );
}

export default Share;
