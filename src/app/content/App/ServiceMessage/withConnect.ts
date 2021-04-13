import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ContentState } from '../../store';
import { optionsRequested } from 'app/actions';
import {
  getServiceMessages,
  getServiceMessageAction
} from 'app/content/selectors';

const mapStateToProps = (state: ContentState) => ({
  messages: getServiceMessages(state),
  action: getServiceMessageAction(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openOnboarding: (pathname: string) => () =>
    dispatch(optionsRequested({ pathname }))
});

export default connect(mapStateToProps, mapDispatchToProps);
