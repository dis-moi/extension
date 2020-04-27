import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StatefulContributor } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import { OptionsState } from 'app/options/store/reducers';
import {
  getContributors,
  getContributorsSuggestions,
  getSubscriptions
} from 'app/options/store/selectors/contributors.selectors';

const mapStateToProps = (state: OptionsState) => ({
  subscriptions: getSubscriptions(state),
  suggestions: getContributorsSuggestions(state),
  allContributors: getContributors(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  subscribe: (contributor: StatefulContributor) => () =>
    dispatch(subscribe(contributor.id, { sendToBackground: true })),
  unsubscribe: (contributor: StatefulContributor) => () =>
    dispatch(unsubscribe(contributor.id, { sendToBackground: true }))
});

export default connect(mapStateToProps, mapDispatchToProps);
