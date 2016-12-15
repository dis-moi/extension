import React, { PropTypes } from 'react';

export default function Criteria(props) {
  const criteria = props.criteria
    .filter(({ slug }) => {
      switch (slug) {
        case 'ethics':
        case 'price':
        case 'quality':
        case 'local':
        case 'ecology':
        case 'health':
          return true;

        default:
          return false;
      }
    })
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
