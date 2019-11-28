import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { goBack, push } from 'connected-react-router';
import {
  likeNotice,
  unlikeNotice,
  dislikeNotice,
  confirmDislikeNotice,
  undislikeNotice,
  unfoldNotice,
  outboundLinkClicked
} from 'app/actions/notices';
import { ContentState } from 'app/content/store';
import { getNoticeById } from 'app/content/selectors';
import { Dispatch } from 'redux';
import { DetailsScreenProps } from './';

const mapStateToProps = (
  state: ContentState,
  props: DetailsScreenProps & RouteComponentProps
) => ({
  notice: getNoticeById(state, props)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  like: (id: number) => dispatch(likeNotice(id)),
  unlike: (id: number) => dispatch(unlikeNotice(id)),
  dislike: (id: number) => dispatch(dislikeNotice(id)),
  confirmDislike: (id: number) => dispatch(confirmDislikeNotice(id)),
  undislike: (id: number) => dispatch(undislikeNotice(id)),
  view: (id: number) => dispatch(unfoldNotice(id)),
  outboundLinkClicked: (id: number, url?: string) =>
    dispatch(outboundLinkClicked(id, url)),
  goBack: () => dispatch(goBack()),
  clickContributor: (contributorId: number) =>
    dispatch(push(`/contributor/${contributorId}`))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
