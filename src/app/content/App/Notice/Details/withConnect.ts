import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { goBack } from 'connected-react-router';
import {
  confirmDislikeNotice as confirmDislike,
  dislikeNotice as dislike,
  likeNotice as like,
  outboundLinkClicked,
  undislikeNotice as undislike,
  unfoldNotice as view,
  unlikeNotice as unlike
} from 'app/actions/notices';
import onContributorClick from 'app/content/actions/goToContributor';
import { ContentState } from 'app/content/store';
import { getNoticeFromRoute, getNoticeRelayer } from 'app/content/selectors';
import { DetailsScreenProps } from './';

const mapStateToProps = (
  state: ContentState,
  props: DetailsScreenProps & RouteComponentProps
) => ({
  notice: getNoticeFromRoute(state, props),
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
  onContributorClick
};

export default connect(mapStateToProps, mapDispatchToProps);
