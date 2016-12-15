import React, { Component, PropTypes } from 'react';

const Editor = ({ editor, author, onCheckOutEditor }) => {

  return (
    <div className="reco-editor">

      <h2>
        <img
          alt=""
          src={'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(editor.url)} />
        {editor.label}
      </h2>

      {/* { author ? (<p className="reco-author">{author}</p>) : undefined }*/}

      { editor.url ? (
        <p className="reco-link">
          <a
            onClick={() => onCheckOutEditor(editor)}
            target="_blank" href={editor.url}>
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
  onCheckOutEditor: PropTypes.func.isRequired,
};

export default Editor;