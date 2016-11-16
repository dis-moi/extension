import React, { PropTypes } from 'react';

function PreferenceSourcesPanel({ editors }) {
  console.log(editors);

  return (
    <div>
      TODO: editors panel.
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

