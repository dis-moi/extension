import React from 'react';
import PropTypes from 'prop-types';

const Contributor = ({ contributor }) => {

  return (
    <adress className="reco-contributor">
      <p>
        Recommandation proposée par
        <br />
        {contributor.name}
      </p>
    </adress>
  );
};

Contributor.propTypes = {
  contributor: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default Contributor;