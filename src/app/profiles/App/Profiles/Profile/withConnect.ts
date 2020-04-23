import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import {
  areContributorsLoading,
  getContributorFromRouteParam,
  getFeaturedNotice,
  areNoticesLoading,
  getContributorNoticesButFeaturedOne
} from 'app/profiles/store/selectors';
import { ProfilesState } from 'app/profiles/store/reducers';
import { fetchContributorNotices } from 'app/profiles/store/actions';
import { getContributorIdFromRouteParam } from 'app/content/selectors';
import { ProfileProps } from './Profile';

export type ConnectedProfileScreenProps = ProfileProps &
  RouteComponentProps<{ id: string }>;

const mapStateToProps = (
  state: ProfilesState,
  props: ConnectedProfileScreenProps
) => ({
  loading: areContributorsLoading(state),
  contributor: getContributorFromRouteParam(state, props),
  featuredNotice: getFeaturedNotice(state, props),
  noticesLoading: areNoticesLoading(state),
  notices: getContributorNoticesButFeaturedOne(state, props)
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: ConnectedProfileScreenProps
) => {
  const contributorId = Number(getContributorIdFromRouteParam({}, props));
  return {
    subscribe: () =>
      dispatch(subscribe(contributorId, { sendToBackground: true })),
    unsubscribe: () =>
      dispatch(unsubscribe(contributorId, { sendToBackground: true })),
    fetchContributorNotices: () =>
      dispatch(fetchContributorNotices(contributorId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
