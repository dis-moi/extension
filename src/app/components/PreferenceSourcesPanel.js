import React, { PropTypes } from 'react';

function PreferenceSourcesPanel(props) {
  const { editors, excludedEditors, onUpdateExcludedEditors } = props;
  const lis = editors.map(editor => {
    return (
      <li key={editor.id}>
        <input
          type="checkbox"
          checked={ excludedEditors.has(editor.id) }
          onChange={ event => {
            let newExcluded;

            if (excludedEditors.has(editor.id))
              newExcluded = excludedEditors.delete(editor.id);
            else
              newExcluded = excludedEditors.add(editor.id);

            onUpdateExcludedEditors(newExcluded);
          }} />
        { editor.label }
      </li>
    );
  });

  return (
    <div>
      Sélectionnez les sources que vous ne considérez pas fiables:
      <ul>{ lis }</ul>
    </div>
  );
}

PreferenceSourcesPanel.PropTypes = {
  editors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string,
  })).isRequired,
};

export default PreferenceSourcesPanel;

