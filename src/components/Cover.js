import React from 'react';

//Generating cover image
function Cover(props) {
  const cover_url = props.url;

  return (
    <img
      className={props.className}
      src={cover_url}
      alt="Cover"
    />
  );
}

export default Cover;
