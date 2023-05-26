import React, { memo } from 'react';
import { string } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Share(props) {
  const { url, title, text } = props;

  const handleSharing = async () => {
    if (navigator.share) {
      await navigator.share({
        url,
        title,
        text,
      });
    }
  };

  return (
    <>
      <a className={'button'} rel="noopener noreferrer" onClick={handleSharing}>
        <FontAwesomeIcon className="icon" icon={['fas', 'fa-share-nodes']} />
      </a>
    </>
  );
}

export default memo(Share);

Share.propType = {
  url: string.isRequired,
  title: string.isRequired,
  text: string.isRequired,
};
