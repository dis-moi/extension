import React, { PropTypes } from 'react';

function PreferenceCriteriaPanel(props) {
  const { criteria, selectCriterion, unselectCriterion } = props;

  const lis = criteria.toArray().map(criterion => {
    const slug = criterion.get('slug');
    const label = criterion.get('label');
    const isSelected = criterion.get('isSelected');

    return(
      <li key={ slug }>
        <input
          type="checkbox"
          checked={ isSelected }
          onChange={ event => {
            if (isSelected)
              unselectCriterion(slug);
            else
              selectCriterion(slug);
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
