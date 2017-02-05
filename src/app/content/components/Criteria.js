import React, { PropTypes } from 'react';

import { filterTags } from '../../lmem/typeOfCriteria';

export default function Criteria(props) {
  const criteria = filterTags(props.criteria)
    .map(criterion => (
      <li key={criterion.slug}>
        <b className={'tag tag-' + criterion.slug}> {criterion.label} </b>
      </li>
    ));

  return (
    <ul className="summary-tags">
      { criteria }
    </ul>
  );
}

Criteria.PropTypes = {
  criteria: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
};
