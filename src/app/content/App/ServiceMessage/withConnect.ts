import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  getServiceMessages,
  getServiceMessageAction
} from 'app/content/store/selectors';
import { optionsRequested } from 'libs/store/actions';
import { ContentState } from '../../store/reducers';

const mapStateToProps = (state: ContentState) => ({
  messages: getServiceMessages(state),
  action: getServiceMessageAction(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openOnboarding: (pathname: string) => () =>
    dispatch(optionsRequested({ pathname }))
});

export default connect(mapStateToProps, mapDispatchToProps);
