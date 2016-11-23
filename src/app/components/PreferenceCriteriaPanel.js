import React, { PropTypes } from 'react';

function PreferenceCriteriaPanel(props) {
  const { criteria, whiteCriteria, onUpdateWhiteCriteria } = props;
  console.log(criteria, whiteCriteria);

  const lis = criteria.map(criterium => {
    return (
      <li>
        <input
          type="checkbox"
          checked={ whiteCriteria.has(criterium.slug) }
          onChange={ event => {
            if (event.target.checked)
              whiteCriteria.add(criterium.slug);
            else
              whiteCriteria.delete(criterium.slug);

            onUpdateWhiteCriteria(whiteCriteria);
          }}>
            { criterium.label }
        </input>
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
