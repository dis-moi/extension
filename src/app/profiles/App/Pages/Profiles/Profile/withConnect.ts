import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ContributorId } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'libs/store/actions/subscription';
import {
  areContributorNoticesAllFetched,
  getContributorFromRouteParam,
  getContributorNoticesButFeaturedOnes,
  getFeaturedNotices,
  getStatefulContributors
} from 'app/profiles/store/selectors';
import { areNoticesLoading } from 'app/profiles/store/selectors/notices';
import { areContributorsLoading } from 'app/profiles/store/selectors/contributors';
import { isConnected } from 'app/profiles/store/selectors/connection';
import { ProfilesState } from 'app/profiles/store/reducers';
import { extensionMessageSender } from 'app/profiles/extensionId';
import { fetchMoreContributorNotices } from 'app/profiles/store/actions/notices';
import { ProfileProps } from './Profile';

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
