import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { OptionsState } from 'app/options/store/reducers';
import {
  getContributorsSuggestions,
  getNbSusbcriptions
} from 'app/options/store/selectors/contributors.selectors';
import { isAnUpdateFromLmem } from 'app/background/selectors';
import { StatefulContributor } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions';
import { push } from 'connected-react-router';

const mapStateToProps = (state: OptionsState) => ({
  suggestions: getContributorsSuggestions(state),
  updatedFromLmem: isAnUpdateFromLmem(state),
  nbSubscriptions: getNbSusbcriptions(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  subscribe: (contributor: StatefulContributor) => () =>
    dispatch(subscribe(contributor, { sendToBackground: true })),
  unsubscribe: (contributor: StatefulContributor) => () =>
    dispatch(unsubscribe(contributor, { sendToBackground: true })),
  next: () => dispatch(push('/onboarding/examples'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
