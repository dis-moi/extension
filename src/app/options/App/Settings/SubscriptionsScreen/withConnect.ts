import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StatefulContributor } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import {
  makeGetNContributorsSuggestions,
  getSubscriptions
} from 'app/options/store/selectors/contributors.selectors';
import { OptionsState } from 'app/options/store/reducers';
import { push } from 'connected-react-router';

const mapStateToProps = (state: OptionsState) => ({
  subscriptions: getSubscriptions(state),
  suggestions: makeGetNContributorsSuggestions(5)(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  subscribe: (contributor: StatefulContributor) => () =>
    dispatch(subscribe(contributor, { sendToBackground: true })),
  unsubscribe: (contributor: StatefulContributor) => () =>
    dispatch(unsubscribe(contributor, { sendToBackground: true })),
  goToSuggestions: () => dispatch(push('/settings/suggestions'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
