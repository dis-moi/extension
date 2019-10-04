import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { OptionsState } from 'app/options/store/reducers';
import { getNbSusbcriptions } from 'app/options/store/selectors/contributors.selectors';
import { isAnUpdateFromLmem } from 'app/background/selectors';
import { push } from 'connected-react-router';

const mapStateToProps = (state: OptionsState) => ({
  updatedFromLmem: isAnUpdateFromLmem(state),
  nbSubscriptions: getNbSusbcriptions(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  next: () => dispatch(push('/onboarding/examples'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
