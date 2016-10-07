import React, { Component, PropTypes } from 'react';

const Editor = ({ recommendation }) => {

  return (
    <div className="reco-editor">

      <h2>{recommendation.editor.name}</h2>

      { !!recommendation.author ? (<p className="reco-author">{recommendation.author}</p>) : undefined }

      { !!recommendation.editor.url ? (
        <p className="reco-link">
          <a target="_blank" href={recommendation.editor.url}>
            {recommendation.editor.url.replace(/https?:\/\/(www\.)?/, '')}
          </a>
        </p>
      ) : undefined }

    </div>
  );
};

Editor.propTypes = {
  recommendation: PropTypes.shape({
    author: PropTypes.string,
    editor: PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Editor;