import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { goBack } from 'connected-react-router';
import {
  likeNotice as like,
  unlikeNotice as unlike,
  dislikeNotice as dislike,
  confirmDislikeNotice as confirmDislike,
  undislikeNotice as undislike,
  unfoldNotice as view,
  outboundLinkClicked
} from 'app/actions/notices';
import clickContributor from 'app/content/actions/goToContributor';
import { ContentState } from 'app/content/store';
import {
  getNoticeFromRoute,
  getNoticeRelayer,
  isNoticeRelayed
} from 'app/content/selectors';
import { DetailsScreenProps } from './';

const mapStateToProps = (
  state: ContentState,
  props: DetailsScreenProps & RouteComponentProps
) => ({
  notice: getNoticeFromRoute(state, props),
  relayed: isNoticeRelayed(state, props),
  relayer: getNoticeRelayer(state, props)
});

const mapDispatchToProps = {
  like,
  unlike,
  dislike,
  confirmDislike,
  undislike,
  view,
  outboundLinkClicked,
  goBack,
  clickContributor
};

export default connect(mapStateToProps, mapDispatchToProps);
