import { connect } from 'react-redux';

import {
  dismissNotice, likeNotice, dislikeNotice, reportNotice
} from '../actions/recommendations';

import { IMAGES_URL } from '../../constants/assetsUrls';
import FeedbackButtons from '../components/FeedbackButtons';

function mapStateToProps(state, ownProps) {
  return Object.assign({}, ownProps, {
    imagesUrl: IMAGES_URL,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    dismissReco(id) { dispatch(dismissNotice(id)); },
    approveReco(id) { dispatch(likeNotice(id)); },
    unapproveReco(id) { dispatch(dislikeNotice(id)); },
    reportReco(id) { dispatch(reportNotice(id)); },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackButtons);
