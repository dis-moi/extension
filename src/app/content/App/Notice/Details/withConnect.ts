import { connect } from 'react-redux';
import { getNoticeById } from '../../../selectors';
import {
  likeNotice,
  unlikeNotice,
  dislikeNotice,
  undislikeNotice
} from 'app/actions/recommendations';
import { close } from 'app/actions/ui';
import { State } from '../../../store';
import { DetailsProps } from './types';

const mapStateToProps = (state: State, props: DetailsProps) => ({
  notice: getNoticeById(state, props)
});

const mapDispatchToProps = {
  like: likeNotice,
  unlike: unlikeNotice,
  dislike: dislikeNotice,
  undislike: undislikeNotice,
  close
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
