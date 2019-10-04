import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { OptionsState } from 'app/options/store/reducers';
import { isAnUpdateFromLmem } from 'app/background/store/selectors';
import { areTosAccepted } from 'app/options/store/selectors';
import { acceptTOS } from 'app/actions/tos';
import { push } from 'connected-react-router';

const mapStateToProps = (state: OptionsState) => ({
  updatedFromLmem: isAnUpdateFromLmem(state),
  termsOfServiceAccepted: areTosAccepted(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onContinue: () => {
    dispatch(acceptTOS({ sendToBackground: true }));
    dispatch(push('/onboarding/subscribe'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
