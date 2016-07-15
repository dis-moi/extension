import React, { Component, PropTypes } from 'react';
import Loader from './Loader';
import AlternativeHeader from './AlternativeHeader';
import AlternativeMain from './AlternativeMain';

const styles = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
};

const Alternatives = ({recommendation, imagesUrl, reduced, onExtend, onReduce, onDeactivateForSession, onDeactivateForSomeTime}) => recommendation ? (
    <div>
        <section id="lmem--alternatives--root" style={styles}>
            <AlternativeHeader
                imagesUrl={imagesUrl} 
                reduced={reduced} 
                onExtend={onExtend} 
                onReduce={onReduce} 
                onDeactivateForSession={onDeactivateForSession} 
                onDeactivateForSomeTime={onDeactivateForSomeTime}
            />
            <AlternativeMain imagesUrl={imagesUrl} recommendation={recommendation} />
        </section>
    </div>
) : (<Loader imagesUrl={ imagesUrl } />);

Alternatives.propTypes = {
    recommendation: PropTypes.object,
    imagesUrl: PropTypes.string.isRequired,
};

export default Alternatives;
