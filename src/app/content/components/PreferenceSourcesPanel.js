import React from 'react';
import PropTypes from 'prop-types';

function PreferenceSourcesPanel(props) {
  const {
    editors, includeEditor, excludeEditor, imagesUrl 
  } = props;

  const lis = editors.toArray()
    .sort((editorA, editorB) => {
      const labelA = editorA.get('label').toUpperCase();
      const labelB = editorB.get('label').toUpperCase();
      return labelA.localeCompare(labelB);
    })
    .map((editor) => {
      const id = editor.get('id');
      const label = editor.get('label');
      const isExcluded = editor.get('isExcluded');

      return (
        <li key={ id }>
          <label htmlFor={ id } className="editor-label">
            <input
              id={ id }
              type="checkbox"
              checked={ isExcluded }
              onChange={ () => (isExcluded ? includeEditor(id) : excludeEditor(id)) } />
            <img
              alt=""
              src={`${imagesUrl}${isExcluded ? 'crosschecked' : 'checked'}.svg`}
            />
            { label }
          </label>
        </li>
      );
    });

  return (
    <div>
      <ul>{ lis }</ul>
      <div className="separation-bar" />
      <aside>
        <h1>Aide</h1>
        <p>
          Recevez les recommandations basées sur les sources que vous avez sélectionnées ci-contre.
        </p>

        <h2>Ajouter une nouvelle source</h2>
        <a href="https://www.lmem.net/contact.html" target="_blank" rel="noopener noreferrer">Contactez-nous</a>
        { ' pour proposer un nouveau média ou un article d’aide au choix.' }
      </aside>
    </div>
  );
}

PreferenceSourcesPanel.propTypes = {
  editors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string,
  })).isRequired,
  includeEditor: PropTypes.func.isRequired,
  excludeEditor: PropTypes.func.isRequired,
  imagesUrl: PropTypes.string.isRequired,
};

export default PreferenceSourcesPanel;

