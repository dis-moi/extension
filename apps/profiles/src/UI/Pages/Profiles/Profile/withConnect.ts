import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ContributorId } from 'libs/lmem/contributor';
import { subscribe, unsubscribe } from 'libs/store/actions/subscription';
import {
  areContributorNoticesAllFetched,
  getContributorFromRouteParam,
  getContributorNoticesButFeaturedOnes,
  getFeaturedNotices,
  getStatefulContributors
} from 'apps/profiles/store/selectors';
import { areNoticesLoading } from 'apps/profiles/src/store/selectors/notices';
import { areContributorsLoading } from 'apps/profiles/src/store/selectors/contributors';
import { isConnected } from 'apps/profiles/src/store/selectors/connection';
import { ProfilesState } from 'apps/profiles/store/reducers';
import { ProfileProps } from './Profile';
import { extensionMessageSender } from 'apps/profiles/src/extensionId';
import { fetchMoreContributorNotices } from 'apps/profiles/src/store/actions/notices';

export type ConnectedProfileScreenProps = ProfileProps &
  RouteComponentProps<{ id: string }>;

const mapStateToProps = (
  state: ProfilesState,
  props: ConnectedProfileScreenProps
) => ({
  loading: areContributorsLoading(state),
  contributor: getContributorFromRouteParam(state, props),
  contributors: getStatefulContributors(state),
  featuredNotices: getFeaturedNotices(state, props),
  noticesLoading: areNoticesLoading(state),
  notices: getContributorNoticesButFeaturedOnes(state, props),
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
