import { connect } from 'react-redux';

import Alternative from '../components/Alternatives';
import Loader from '../components/Loader';
import * as alternativesActions from '../actions/offers';

import { STYLES_URL, IMAGES_URL } from 'app/constants/assetsUrls';

function mapStateToProps(state) {
  return {
    //recommendation: state.recommendation,
    //stylesUrl: STYLES_URL + 'alt.css',
    imagesUrl: IMAGES_URL
  };
}

const mapDispatchToProps = alternativesActions; // { ...counterActions, ...};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
