import React from 'react';
import PropTypes from 'prop-types';

import { filterTags } from '../../lmem/typeOfCriteria';

export default function Criteria({ criteria }) {
  const filteredCriteria = filterTags(criteria)
    .map(criterion => (
      <li key={criterion.slug}>
        <b className={'tag tag-' + criterion.slug}> 
          {' '}
          {criterion.label}
          {' '}
        </b>
      </li>
    ));

  return (
    <ul className="summary-tags">
      { filteredCriteria }
    </ul>
  );
}

Criteria.propTypes = {
  criteria: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
};
