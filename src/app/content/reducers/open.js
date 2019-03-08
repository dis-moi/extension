import {Map as ImmutableMap} from 'immutable';
import {
  CLOSED, DEACTIVATE, OPENED, REPORT_NOTICE, UNINSTALL
} from '../../constants/ActionTypes';

const initialState = new ImmutableMap({
  open: false,
  mounted: false,
});

export default (state = initialState, action) => {
  if (typeof state === 'boolean') {
    state = new ImmutableMap({ open: state, mounted: state });
  }

  const { type } = action;

  switch (type) {
    case DEACTIVATE:
    case REPORT_NOTICE:
    case UNINSTALL:
    case CLOSED:
      return state.set('open', false);

    case OPENED:
      return state.set('open', true).set('mounted', true);

    default:
      return state;
  }
};
