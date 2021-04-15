import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { Contributor } from 'libs/lmem/contributor';
import { subscribe, unsubscribe } from 'libs/store/actions/subscription';
import {
  getSimilarContributors,
  getStatefulContributors
} from 'apps/profiles/store/selectors';
import { areContributorsLoading } from 'apps/profiles/src/store/selectors/contributors';
import { ProfilesState } from 'apps/profiles/store/reducers';
import { extensionMessageSender } from 'apps/profiles/src/extensionId';

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
  contributors: getStatefulContributors(state)
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
