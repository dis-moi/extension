import React, { Component, PropTypes } from 'react';

const Editor = ({ editor, author }) => {

  return (
    <div className="reco-editor">

      <h2>{editor.label}</h2>

      {/* { author ? (<p className="reco-author">{author}</p>) : undefined }*/}

      { editor.url ? (
        <p className="reco-link">
          <a target="_blank" href={editor.url}>
            {editor.url.replace(/https?:\/\/(www\.)?/, '')}
          </a>
        </p>
      ) : undefined }

    </div>
  );
};

Editor.propTypes = {
  author: PropTypes.string,
  editor: PropTypes.shape({
    label: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default Editor;