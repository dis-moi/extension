import React, { Component, PropTypes } from 'react';
import Loader from './Loader';
import AlternativeHeader from './AlternativeHeader';
import AlternativeMain from './AlternativeMain';

const Alternatives = ({
  recommendation, imagesUrl, contributorUrl, reduced, onExtend, onReduce, onDeactivate
}) => {
  return recommendation ? (
    <section>
      <AlternativeHeader
        imagesUrl={imagesUrl}
        reduced={reduced}
        onExtend={onExtend}
        onReduce={onReduce}
        onDeactivate={onDeactivate}
        />
      <AlternativeMain
        imagesUrl={imagesUrl}
        contributorUrl={contributorUrl}
        recommendation={recommendation} />
    </section>
  ) : (<Loader imagesUrl={imagesUrl} />);
};

Alternatives.propTypes = {
  recommendation: PropTypes.object,
  imagesUrl: PropTypes.string.isRequired,
  contributorUrl: PropTypes.string.isRequired,
  reduced: PropTypes.bool.isRequired,
  onExtend: PropTypes.func.isRequired,
  onReduce: PropTypes.func.isRequired,
};

export default Alternatives;
