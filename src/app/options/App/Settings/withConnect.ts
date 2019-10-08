import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { OptionsState } from 'app/options/store/reducers';
import { getCurrentScreen } from 'app/options/store/selectors/router.selectors';
import { areTosAccepted } from '../../store/selectors';

const mapStateToProps = (state: OptionsState) => ({
  currentScreen: getCurrentScreen(state),
  tosAccepted: areTosAccepted(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  goToSubscriptions: () => dispatch(push('/settings/subscriptions')),
  goToSuggestions: () => dispatch(push('/settings/suggestions'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
