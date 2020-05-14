import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import {
  areContributorsLoading,
  getContributorFromRouteParam,
  getFeaturedNotice,
  areNoticesLoading,
  getContributorNoticesButFeaturedOne,
  getContributors
} from 'app/profiles/store/selectors';
import { ProfilesState } from 'app/profiles/store/reducers';
import { ProfileProps } from './Profile';

export type ConnectedProfileScreenProps = ProfileProps &
  RouteComponentProps<{ id: string }>;

const mapStateToProps = (
  state: ProfilesState,
  props: ConnectedProfileScreenProps
) => ({
  loading: areContributorsLoading(state),
  contributor: getContributorFromRouteParam(state, props),
  contributors: getContributors(state),
  contributorsLoading: areContributorsLoading(state),
  featuredNotice: getFeaturedNotice(state, props),
  noticesLoading: areNoticesLoading(state),
  notices: getContributorNoticesButFeaturedOne(state, props)
});

const mapDispatchToProps = {
  subscribe,
  unsubscribe
};

export default connect(mapStateToProps, mapDispatchToProps);
