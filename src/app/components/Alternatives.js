import React, { Component, PropTypes } from 'react';
import Loader from './Loader';
import AlternativeHeader from './AlternativeHeader';
import AlternativeMain from './AlternativeMain';

const Alternatives = ({recommendation, imagesUrl, reduced, onExtend, onReduce, onDeactivate}) => recommendation ? (
    <section>
        <AlternativeMain imagesUrl={imagesUrl} recommendation={recommendation} />
        <AlternativeHeader
            imagesUrl={imagesUrl}
            reduced={reduced}
            onExtend={onExtend}
            onReduce={onReduce}
            onDeactivate={onDeactivate}
        />
    </section>
) : (<Loader imagesUrl={ imagesUrl } />);

Alternatives.propTypes = {
    recommendation: PropTypes.object,
    imagesUrl: PropTypes.string.isRequired,
};

export default Alternatives;
