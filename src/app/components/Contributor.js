import React, { Component, PropTypes } from 'react';

const Contributor = ({ recommendation }) => {

  return (
    <adress className="reco-contributor">
      <p>
        {'Recommandation proposée par'}
        {recommendation.contributor.name}
      </p>
    </adress>
  );
};

Contributor.propTypes = {
  recommendation: PropTypes.shape({
    contributor: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Contributor;