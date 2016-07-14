import { connect } from 'react-redux';

import Alternative from '../components/Alternatives';

import { IMAGES_URL } from 'app/constants/assetsUrls';

function mapStateToProps(state) {

  return {
    recommendation: state.alternative && state.alternative.matchingOffers[0].recommendation,
    imagesUrl: IMAGES_URL
  };
}

//const mapDispatchToProps = alternativesActions; // { ...counterActions, ...};

export default connect(mapStateToProps)(Alternative);
