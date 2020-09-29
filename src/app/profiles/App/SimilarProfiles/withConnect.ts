import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { Contributor } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import {
  getSimilarContributors,
  getStatefulContributors
} from 'app/profiles/store/selectors';
import { areContributorsLoading } from 'app/profiles/store/selectors/contributors';
import { ProfilesState } from 'app/profiles/store/reducers';
import { extensionMessageSender } from 'app/profiles/extensionId';
import { SimilarProfilesProps } from './SimilarProfiles';

export type ConnectedSimilarProfileProps = SimilarProfilesProps &
  RouteComponentProps<{ id: string }>;

interface DispatchProps {
  subscribe: (contributor: Contributor) => void;
  unsubscribe: (contributor: Contributor) => void;
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
  subscribe: (contributor: Contributor) =>
    dispatch(subscribe(contributor.id, { receiver: extensionMessageSender })),
  unsubscribe: (contributor: Contributor) =>
    dispatch(unsubscribe(contributor.id, { receiver: extensionMessageSender }))
});

export default connect<
  ProfilesState,
  DispatchProps,
  ConnectedSimilarProfileProps
>(mapStateToProps, mapDispatchToProps);
