import React, { PropTypes } from 'react';

function PreferenceCriteriaPanel({ criteria }) {
  console.log(criteria);

  return (
    <div>
      TODO: criteria panel.
    </div>
  );
}

PreferenceCriteriaPanel.PropTypes = {
  criteria: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

export default PreferenceCriteriaPanel;
