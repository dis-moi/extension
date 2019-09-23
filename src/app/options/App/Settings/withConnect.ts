import { connect } from 'react-redux';
import { OptionsState } from 'app/options/store/reducers';
import { getCurrentScreen } from 'app/options/store/selectors/router.selectors';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

const mapStateToProps = (state: OptionsState) => ({
  currentScreen: getCurrentScreen(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  goToSubscriptions: () => dispatch(push('/settings/subscriptions')),
  goToSuggestions: () => dispatch(push('/settings/suggestions'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
