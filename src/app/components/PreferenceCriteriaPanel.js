import React, { PropTypes } from 'react';

function PreferenceCriteriaPanel(props) {
  const { criteria, selectCriterium, unselectCriterium } = props;

  let lis = [];

  criteria.forEach((criterium, slug) => {
    const label = criterium.get('label');
    const isSelected = criterium.get('isSelected');

    lis.push(
      <li key={ slug }>
        <input
          type="checkbox"
          checked={ isSelected }
          onChange={ event => {
            if (isSelected)
              unselectCriterium(slug);
            else
              selectCriterium(slug);
          }} />
        { label }
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
