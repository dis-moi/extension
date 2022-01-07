import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { Contributor } from 'libs/domain/contributor';
import { subscribe, unsubscribe } from 'libs/store/actions/subscription';
import {
  getFamousContributors,
  getSimilarContributors,
  getStatefulContributors
} from 'app/profiles/store/selectors';
import { areContributorsLoading } from 'app/profiles/store/selectors/contributors';
import { ProfilesState } from 'app/profiles/store/reducers';
import { extensionMessageSender } from 'app/profiles/extensionId';
import { isConnected } from '../../store/selectors/connection';

export interface ConnectedSimilarProfileProps
  extends RouteComponentProps<{ id: string }> {
  subscribe?: (contributor: Contributor) => () => void;
  unsubscribe?: (contributor: Contributor) => () => void;
}

const mapStateToProps = (
  state: ProfilesState,
  props: ConnectedSimilarProfileProps
) => ({
  loading: areContributorsLoading(state),
  similarContributors: getSimilarContributors(state, props).slice(0, 6),
  contributors: getStatefulContributors(state),
  famousContributors: getFamousContributors(state),
  connected: isConnected(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  subscribe: (contributor: Contributor) => () =>
    dispatch(subscribe(contributor.id, { receiver: extensionMessageSender })),
  unsubscribe: (contributor: Contributor) => () =>
    dispatch(unsubscribe(contributor.id, { receiver: extensionMessageSender }))
});

const mergeProps = (
  stateProps: ReturnType<typeof mapStateToProps>,
  dispatchProps: ReturnType<typeof mapDispatchToProps>,
  ownProps: ConnectedSimilarProfileProps
) => ({
  ...ownProps,
  ...stateProps,
  // subscribe/unsubscribe may be supplied from parent : priority over selector
  subscribe: ownProps.subscribe || dispatchProps.subscribe,
  unsubscribe: ownProps.unsubscribe || dispatchProps.unsubscribe
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps);
