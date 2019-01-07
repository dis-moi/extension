import { connect } from 'react-redux';

import { dismissReco, approveReco, unapproveReco, reportReco } from '../actions/recommendations';
import { IMAGES_URL } from '../../constants/assetsUrls';
import FeedbackButtons from '../components/FeedbackButtons';

function mapStateToProps(state, ownProps) {
  return Object.assign({}, ownProps, {
    imagesUrl: IMAGES_URL,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    dismissReco(id) { dispatch(dismissReco(id)); },
    approveReco(id) { dispatch(approveReco(id)); },
    unapproveReco(id) { dispatch(unapproveReco(id)); },
    reportReco(id) { dispatch(reportReco(id)); },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackButtons);