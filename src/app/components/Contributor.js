import React, { Component, PropTypes } from 'react';

const Contributor = ({ contributor }) => {

  return (
    <adress className="reco-contributor">
      <p>
        { `Recommandation proposée par ${contributor.name}.` }
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