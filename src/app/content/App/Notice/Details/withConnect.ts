import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  likeNotice,
  unlikeNotice,
  dislikeNotice,
  undislikeNotice,
  readNotice
} from 'app/actions/notices';
import { close } from 'app/actions/ui';
import { State } from '../../../store';
import { getNoticeById } from '../../../selectors';
import { DetailsProps } from './types';

const mapStateToProps = (
  state: State,
  props: DetailsProps & RouteComponentProps
) => ({
  notice: getNoticeById(state, props)
});

const mapDispatchToProps = {
  like: likeNotice,
  unlike: unlikeNotice,
  dislike: dislikeNotice,
  undislike: undislikeNotice,
  view: readNotice,
  close
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
