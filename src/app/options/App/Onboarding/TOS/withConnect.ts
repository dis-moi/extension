import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { OptionsState } from 'app/options/store/reducers';
import { areTosAccepted } from 'app/options/store/selectors';
import { acceptTOS } from 'app/actions/tos';
import { push } from 'connected-react-router';

const mapStateToProps = (state: OptionsState) => ({
  termsOfServiceAccepted: areTosAccepted(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onContinue: () => {
    dispatch(acceptTOS({ sendToBackground: true }));
    dispatch(push('/onboarding/examples'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
