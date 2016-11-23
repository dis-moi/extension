import React, { PropTypes } from 'react';

function PreferenceSourcesPanel(props) {
  const { editors, blackEditors, onUpdateBlackEditors } = props;
  console.log(editors, blackEditors);

  const lis = editors.map(editor => {
    return (
      <li>
        <input
          type="checkbox"
          checked={ blackEditors.has(editor.id) }
          onChange={ event => {
            if (event.target.checked)
              blackEditors.add(editor.id);
            else
              blackEditors.delete(editor.id);

            onUpdateBlackEditors(blackEditors);
          }}>
            { editor.label }
        </input>
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

