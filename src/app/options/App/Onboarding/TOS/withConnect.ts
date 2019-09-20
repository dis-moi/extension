import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { OptionsState } from 'app/options/store/reducers';
import { isAnUpdateFromLmem } from 'app/background/selectors';
import { areTosAccepted } from 'app/options/store/selectors';
import { acceptTOS } from 'app/actions/tos';
import { push } from 'connected-react-router';

const mapStateToProps = (state: OptionsState) => ({
  updatedFromLmem: isAnUpdateFromLmem(state),
  termsOfServiceAccepted: areTosAccepted(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  acceptTermsOfService: () => dispatch(acceptTOS({ sendToBackground: true })),
  next: () => dispatch(push('/onboarding/subscribe'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
