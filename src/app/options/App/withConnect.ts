import { connect } from 'react-redux';
import { OptionsState } from '../store/reducers';
import { getCurrentScreen } from '../store/selectors/router.selectors';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

const mapStateToProps = (state: OptionsState) => ({
  currentScreen: getCurrentScreen(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  goToSubscriptions: () => dispatch(push('/subscriptions')),
  goToSuggestions: () => dispatch(push('/suggestions'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
