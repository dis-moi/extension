import React, { Component, PropTypes } from 'react';
import Loader from './Loader';
import RecoHeader from './RecoHeader';
import RecoMain from './RecoMain';
import Preferences from '../containers/Preferences';

class Recommendations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // deactivateMenuOpen: false
    };
  }

  render(){
    const { props } = this;
    const {
      recommendations, imagesUrl, reduced, preferenceScreenPanel,
      onExtend, onReduce, onDeactivate, closePrefScreen, openPrefScreen,
      onCheckOutResource, onCheckOutAlternative, onCheckOutEditor,
      dismissReco, approveReco
    } = props;

    const body = preferenceScreenPanel ?
      <Preferences /> :
      <RecoMain
        imagesUrl={imagesUrl}
        recommendations={recommendations}
        onCheckOutResource={onCheckOutResource}
        onCheckOutAlternative={onCheckOutAlternative}
        onCheckOutEditor={onCheckOutEditor}
        dismissReco={dismissReco}
        approveReco={approveReco}
        reportReco={reportReco}
      />;
      
    return recommendations ? (
      <section className="lmem-top-level">
        <RecoHeader
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


Recommendations.propTypes = {
  recommendations: PropTypes.array,
  imagesUrl: PropTypes.string.isRequired,
  reduced: PropTypes.bool.isRequired,
  onExtend: PropTypes.func.isRequired,
  onReduce: PropTypes.func.isRequired,
  onCheckOutResource: PropTypes.func.isRequired,
  onCheckOutAlternative: PropTypes.func.isRequired,
  onCheckOutEditor: PropTypes.func.isRequired,
  dismissReco: PropTypes.func.isRequired,
  approveReco: PropTypes.func.isRequired,
  reportReco: PropTypes.func.isRequired
};

export default Recommendations;
