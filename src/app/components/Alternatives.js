import React, { Component, PropTypes } from 'react';
import Loader from './Loader';
import AlternativeHeader from './AlternativeHeader';
import AlternativeMain from './AlternativeMain';
import PreferenceScreen from './PreferenceScreen';

class Alternatives extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // deactivateMenuOpen: false
    };
  }

  render(){
    const { props, state } = this;
    const {
      recommendations, imagesUrl, reduced, preferenceScreenPanel, deactivatedWebsites, onInstalledDetails,
      onExtend, onReduce, onDeactivate, togglePrefPanel, onReactivateWebsite, closePrefScreen, openPrefScreen
    } = props;

    const body = (preferenceScreenPanel ?
      <PreferenceScreen
        preferenceScreenPanel={preferenceScreenPanel}
        deactivatedWebsites={deactivatedWebsites} 
        onReactivateWebsite={onReactivateWebsite}
        openPrefScreen={openPrefScreen}
        imagesUrl={imagesUrl}
        onInstalledDetails={onInstalledDetails}
      /> :
      <AlternativeMain imagesUrl={imagesUrl} recommendations={recommendations} />);
      
    return recommendations ? (
      <section className="lmem-top-level">
        <AlternativeHeader
          imagesUrl={imagesUrl}
          reduced={reduced}
          preferenceScreenPanel={preferenceScreenPanel}
          onExtend={onExtend}
          onReduce={onReduce}
          onDeactivate={onDeactivate}
          closePrefScreen={closePrefScreen}
          openPrefScreen={openPrefScreen}
          />
        { body }
      </section>
      ) : (<Loader imagesUrl={ imagesUrl } />);
  }
}


Alternatives.propTypes = {
  recommendations: PropTypes.array,
  imagesUrl: PropTypes.string.isRequired,
  reduced: PropTypes.bool.isRequired,
  onExtend: PropTypes.func.isRequired,
  onReduce: PropTypes.func.isRequired,
  onInstalledDetails: PropTypes.object.isRequired,
};

export default Alternatives;
