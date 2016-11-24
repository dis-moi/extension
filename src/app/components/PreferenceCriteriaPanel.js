import React, { PropTypes } from 'react';

function PreferenceCriteriaPanel(props) {
  const { criteria, selectedCriteria, onUpdateSelectedCriteria } = props;
  const lis = criteria.map(criterium => {
    return (
      <li key={criterium.slug}>
        <input
          type="checkbox"
          checked={ selectedCriteria.has(criterium.slug) }
          onChange={ event => {
            let newSelection;

            if (selectedCriteria.has(criterium.slug))
              newSelection = selectedCriteria.delete(criterium.slug);
            else
              newSelection = selectedCriteria.add(criterium.slug);

            onUpdateSelectedCriteria(newSelection);
          }} />
        { criterium.label }
      </li>
    );
  });

  return (
    <div>
      Sélectionnez les critères qui sont importants pour vous:
      <ul>{ lis }</ul>
    </div>
  );
}

PreferenceCriteriaPanel.PropTypes = {
  criteria: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired
};

export default PreferenceCriteriaPanel;
