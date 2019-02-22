import React from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';
import RecoHeader from './RecoHeader';
import RecoMain from './RecoMain';
import Preferences from '../containers/Preferences';
import { recommendation as RecommendationPropType } from '../../propTypes';

export default function Recommendations(props) {
  const {
    recommendations, imagesUrl, reduced, preferenceScreenPanel,
    onExtend, onReduce, onDeactivate, closePrefScreen, openPrefScreen,
    onCheckOutResourceButton, onCheckOutResourceLink, onCheckOutAlternative, onCheckOutEditor,
  } = props;

  const body = preferenceScreenPanel
    ? <Preferences />
    : (
      recommendations.length > 0
      && (
        <RecoMain
          imagesUrl={imagesUrl}
          recommendations={recommendations}
          onCheckOutResourceButton={onCheckOutResourceButton}
          onCheckOutResourceLink={onCheckOutResourceLink}
          onCheckOutAlternative={onCheckOutAlternative}
          onCheckOutEditor={onCheckOutEditor}
        />
      )
    );

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
  recommendations: PropTypes.arrayOf(PropTypes.shape(RecommendationPropType)),
  imagesUrl: PropTypes.string.isRequired,
  reduced: PropTypes.bool.isRequired,
  onExtend: PropTypes.func.isRequired,
  onReduce: PropTypes.func.isRequired,
  onCheckOutResourceButton: PropTypes.func.isRequired,
  onCheckOutResourceLink: PropTypes.func.isRequired,
  onCheckOutAlternative: PropTypes.func.isRequired,
  onCheckOutEditor: PropTypes.func.isRequired,
};

Recommendations.defaultProps = {
  recommendations: [],
};
