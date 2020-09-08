import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ContributorId } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import {
  areContributorNoticesAllFetched,
  getContributorFromRouteParam,
  getContributorNoticesButFeaturedOne,
  getFeaturedNotice,
  getSimilarContributors,
  getStatefulContributors
} from 'app/profiles/store/selectors';
import { areNoticesLoading } from 'app/profiles/store/selectors/notices';
import { areContributorsLoading } from 'app/profiles/store/selectors/contributors';
import { isConnected } from 'app/profiles/store/selectors/connection';
import { ProfilesState } from 'app/profiles/store/reducers';
import { ProfileProps } from './Profile';
import { extensionMessageSender } from 'app/profiles/extensionId';
import { fetchMoreContributorNotices } from '../../../store/actions/notices';

export type ConnectedProfileScreenProps = ProfileProps &
  RouteComponentProps<{ id: string }>;

const mapStateToProps = (
  state: ProfilesState,
  props: ConnectedProfileScreenProps
) => ({
  loading: areContributorsLoading(state),
  contributor: getContributorFromRouteParam(state, props),
  similarContributors: getSimilarContributors(state, props).slice(0, 6),
  contributors: getStatefulContributors(state),
  contributorsLoading: areContributorsLoading(state),
  featuredNotice: getFeaturedNotice(state, props),
  noticesLoading: areNoticesLoading(state),
  notices: getContributorNoticesButFeaturedOne(state, props),
  fetchedAll: (contributorId: ContributorId) =>
    areContributorNoticesAllFetched(state, contributorId),
  connected: isConnected(state),
  addToBrowser: clickInstallHandler
});

const mapDispatchToProps = {
  subscribe: (contributorId: ContributorId) =>
    subscribe(contributorId, { receiver: extensionMessageSender }),
  unsubscribe: (contributorId: ContributorId) =>
    unsubscribe(contributorId, { receiver: extensionMessageSender }),
  fetchMoreNotices: fetchMoreContributorNotices
};

const mergeProps = (
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: typeof mapDispatchToProps,
  ownProps: object
) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  fetchedAll: stateProps.contributor
    ? stateProps.fetchedAll(stateProps.contributor?.id)
    : false,
  fetchMoreNotices: () => {
    if (stateProps.contributor)
      dispatchProps.fetchMoreNotices(stateProps.contributor.id);
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps);
