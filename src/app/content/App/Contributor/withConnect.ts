import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { StatefulContributor } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import {
  getContributorById,
  StateWithContributors
} from 'app/options/store/selectors/contributors.selectors';
import { ContributorScreenProps } from './ContributorScreen';

export type ConnectedContributorScreenProps = ContributorScreenProps &
  RouteComponentProps<{ id: string }>;

const mapStateToProps = (
  state: StateWithContributors,
  { match: { params } }: ConnectedContributorScreenProps
) => ({
  contributor: getContributorById(Number(params.id))(
    state
  ) as StatefulContributor
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { match: { params } }: ConnectedContributorScreenProps
) => ({
  subscribe: () =>
    dispatch(subscribe(Number(params.id), { sendToBackground: true })),
  unsubscribe: () =>
    dispatch(unsubscribe(Number(params.id), { sendToBackground: true }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
