import React, { PropTypes } from 'react';
import Loader from './Loader';
import RecoHeader from './RecoHeader';
import RecoMain from './RecoMain';
import Preferences from '../containers/Preferences';

export default function Recommendations(props) {
  const {
    recommendations, imagesUrl, reduced, preferenceScreenPanel,
    onExtend, onReduce, onDeactivate, closePrefScreen, openPrefScreen,
    onCheckOutResource, onCheckOutAlternative, onCheckOutEditor,
  } = props;

  const body = preferenceScreenPanel ?
    <Preferences /> :
    <RecoMain
      imagesUrl={imagesUrl}
      recommendations={recommendations}
      onCheckOutResource={onCheckOutResource}
      onCheckOutAlternative={onCheckOutAlternative}
      onCheckOutEditor={onCheckOutEditor}
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

Recommendations.propTypes = {
  recommendations: PropTypes.array,
  imagesUrl: PropTypes.string.isRequired,
  reduced: PropTypes.bool.isRequired,
  onExtend: PropTypes.func.isRequired,
  onReduce: PropTypes.func.isRequired,
  onCheckOutResource: PropTypes.func.isRequired,
  onCheckOutAlternative: PropTypes.func.isRequired,
  onCheckOutEditor: PropTypes.func.isRequired,
};
