import React, { Component, PropTypes } from 'react';
import Loader from './Loader';
import AlternativeHeader from './AlternativeHeader';
import AlternativeMain from './AlternativeMain';
import PreferencePanel from './PreferencePanel';

const Alternatives = ({
  recommendation, imagesUrl, reduced, contributorUrl, preferencePanelOpen, deactivatedWebsites,
  onExtend, onReduce, onDeactivate, togglePrefPanel, onReactivateWebsite
}) => {
  const body = (preferencePanelOpen ?
    <PreferencePanel
      deactivatedWebsites={deactivatedWebsites} 
      onReactivateWebsite={onReactivateWebsite}
    /> :
    <AlternativeMain 
      imagesUrl={imagesUrl}
      contributorUrl={contributorUrl}
      recommendation={recommendation}
    />);

  return recommendation ? (
    <section>
      <AlternativeHeader
        imagesUrl={imagesUrl}
        reduced={reduced}
        onExtend={onExtend}
        onReduce={onReduce}
        onDeactivate={onDeactivate}
        togglePrefPanel={togglePrefPanel}
        />
      { body }
    </section>
    ) : (<Loader imagesUrl={ imagesUrl } />);
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
