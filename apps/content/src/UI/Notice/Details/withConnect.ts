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
} from '../../../../../../libs/store/actions/notices';
import onContributorClick from 'apps/content/src/store/actions/goToContributor';
import { ContentState } from 'apps/content/src/store';
import {
  getNoticeFromRoute,
  getNoticeRelayer
} from 'apps/content/src/store/selectors';
import { DetailsScreenProps } from './index';

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
