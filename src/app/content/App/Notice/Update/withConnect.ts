import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { optionsRequested } from 'app/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openOnboarding: () => dispatch(optionsRequested('/onboarding'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
