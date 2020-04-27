import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ContributorId } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import {
  getContributorFromRouteParam,
  getFeaturedNotice,
  getContributorNoticesButFeaturedOne,
  getStatefulContributors
} from 'app/profiles/store/selectors';
import { areNoticesLoading } from 'app/profiles/store/selectors/notices';
import { areContributorsLoading } from 'app/profiles/store/selectors/contributors';
import { isConnected } from 'app/profiles/store/selectors/connection';
import { ProfilesState } from 'app/profiles/store/reducers';
import { ProfileProps } from './Profile';
import createMessageSender from 'app/profiles/createMessageSender';
import extensionId from 'app/profiles/extensionId';

export type ConnectedProfileScreenProps = ProfileProps &
  RouteComponentProps<{ id: string }>;

const mapStateToProps = (
  state: ProfilesState,
  props: ConnectedProfileScreenProps
) => ({
  loading: areContributorsLoading(state),
  contributor: getContributorFromRouteParam(state, props),
  contributors: getStatefulContributors(state),
  contributorsLoading: areContributorsLoading(state),
  featuredNotice: getFeaturedNotice(state, props),
  noticesLoading: areNoticesLoading(state),
  notices: getContributorNoticesButFeaturedOne(state, props),
  connected: isConnected(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const receiver = createMessageSender({ id: extensionId });

  return {
    subscribe: (contributorId: ContributorId) =>
      dispatch(subscribe(contributorId, { receiver })),
    unsubscribe: (contributorId: ContributorId) =>
      dispatch(unsubscribe(contributorId, { receiver }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
