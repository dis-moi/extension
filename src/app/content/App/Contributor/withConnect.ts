import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import { StateWithContributors } from 'app/options/store/selectors/contributors.selectors';
import {
  getCurrentContributor,
  getContributorIdFromRouteParam
} from 'app/content/selectors';
import { ContributorScreenProps } from './ContributorScreen';
import { StatefulContributor } from 'app/lmem/contributor';

export type ConnectedContributorScreenProps = ContributorScreenProps &
  RouteComponentProps<{ id: string }>;

const mapStateToProps = (
  state: StateWithContributors,
  props: ConnectedContributorScreenProps
) => ({
  contributor: getCurrentContributor(state, props) as StatefulContributor
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: ConnectedContributorScreenProps
) => {
  const contributorId = Number(getContributorIdFromRouteParam({}, props));
  return {
    subscribe: () =>
      dispatch(subscribe(contributorId, { sendToBackground: true })),
    unsubscribe: () =>
      dispatch(unsubscribe(contributorId, { sendToBackground: true }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
