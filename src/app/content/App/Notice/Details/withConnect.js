import { connect } from 'react-redux';
import { getNoticeById } from '../../../selectors';
import {
  likeNotice, unlikeNotice, dislikeNotice, undislikeNotice
} from '../../../actions/recommendations';
import { close } from '../../../actions/ui';

const mapStateToProps = (state, props) => ({
  notice: getNoticeById(state, props),
});

const mapDispatchToProps = {
  like: likeNotice,
  unlike: unlikeNotice,
  dislike: dislikeNotice,
  undislike: undislikeNotice,
  close,
};

export default connect(mapStateToProps, mapDispatchToProps);
