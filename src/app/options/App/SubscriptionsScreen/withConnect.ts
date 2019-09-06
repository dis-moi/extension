import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StatefulContributor } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import {
  getSubscriptions,
  makeGetNContributorsSuggestions
} from '../../store/selectors/contributors.selectors';
import { OptionsState } from '../../store/reducers';
import { push } from 'connected-react-router';

const get6Suggestions = makeGetNContributorsSuggestions(6);

const mapStateToProps = (state: OptionsState) => ({
  subscriptions: getSubscriptions(state),
  suggestions6: get6Suggestions(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  subscribe: (contributor: StatefulContributor) => () =>
    dispatch(subscribe(contributor, { sendToBackground: true })),
  unsubscribe: (contributor: StatefulContributor) => () =>
    dispatch(unsubscribe(contributor, { sendToBackground: true })),
  goToSuggestions: () => dispatch(push('/suggestions'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
