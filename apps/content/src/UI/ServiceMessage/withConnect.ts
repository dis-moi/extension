import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { optionsRequested } from 'src/app/actions';
import {
  getServiceMessages,
  getServiceMessageAction
} from 'apps/content/src/store/selectors';
import { ContentState } from '../../store';

const mapStateToProps = (state: ContentState) => ({
  messages: getServiceMessages(state),
  action: getServiceMessageAction(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openOnboarding: (pathname: string) => () =>
    dispatch(optionsRequested({ pathname }))
});

export default connect(mapStateToProps, mapDispatchToProps);
