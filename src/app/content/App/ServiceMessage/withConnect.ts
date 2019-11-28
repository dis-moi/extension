import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { optionsRequested } from 'app/actions';
import {
  getServiceMessage,
  getServiceMessageAction
} from 'app/content/selectors';
import { ContentState } from '../../store';

const mapStateToProps = (state: ContentState) => ({
  serviceMessage: getServiceMessage(state) as string,
  action: getServiceMessageAction(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openOnboarding: (pathname: string) => () =>
    dispatch(optionsRequested(pathname))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
