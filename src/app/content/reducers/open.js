import {
  CLOSED, DEACTIVATE, OPENED, REPORT_NOTICE, UNINSTALL
} from '../../constants/ActionTypes';

export default (state = false, action) => {
  const { type } = action;

  switch (type) {
    case DEACTIVATE:
    case REPORT_NOTICE:
    case UNINSTALL:
    case CLOSED:
      return false;

    case OPENED:
      return true;

    default:
      return state;
  }
};
