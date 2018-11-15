import React from 'react';
import PropTypes from 'prop-types';

const Editor = ({ editor, author, onCheckOutEditor }) => {

  return (
    <div className="reco-editor">

      <h2>
        <img
          alt=""
          src={'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(editor.url)} />
        {editor.label}
      </h2>

      {/* { author ? (<p className="reco-author">{author}</p>) : undefined } */}

      { editor.url ? (
        <p className="reco-link">
          <a
            onClick={() => onCheckOutEditor(editor)}
            target="_blank"
            rel="noopener noreferrer"
            href={editor.url}>
            {editor.url.replace(/(?:^https?:\/\/(?:www\.)?|\?.+$)/g, '')}
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

Editor.defaultProps = {
  author: null,
};

export default Editor;