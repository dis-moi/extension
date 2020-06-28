import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StatefulContributor } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import {
  getSubscriptions,
  get5ContributorsSuggestions,
  getContributors
} from 'app/options/store/selectors/contributors.selectors';
import { OptionsState } from 'app/options/store/reducers';
import { push } from 'connected-react-router';

const mapStateToProps = (state: OptionsState) => ({
  subscriptions: getSubscriptions(state),
  suggestions: get5ContributorsSuggestions(state),
  allContributors: getContributors(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  subscribe: (contributor: StatefulContributor) => () =>
    dispatch(subscribe(contributor.id, { sendToBackground: true })),
  unsubscribe: (contributor: StatefulContributor) => () =>
    dispatch(unsubscribe(contributor.id, { sendToBackground: true })),
  goToSuggestions: () => dispatch(push('/settings/suggestions'))
});

export default connect(mapStateToProps, mapDispatchToProps);
