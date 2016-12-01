import React, { PropTypes } from 'react';

function PreferenceSourcesPanel(props) {
  const { editors, includeEditor, excludeEditor } = props;

  const lis = editors.toArray().map(editor => {
    const id = editor.get('id');
    const label = editor.get('label');
    const isExcluded = editor.get('isExcluded');

    return (
      <li key={ id }>
        <input
          type="checkbox"
          checked={ isExcluded }
          onChange={ event => {
            if (isExcluded)
              includeEditor(id);
            else
              excludeEditor(id);
          }} />
        { label }
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

