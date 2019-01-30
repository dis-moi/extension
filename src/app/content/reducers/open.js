import {
  CLOSED, DEACTIVATE, OPENED, REPORT_RECO, UNINSTALL
} from '../../constants/ActionTypes';

export default (state = false, action) => {
  const { type } = action;

  switch (type) {
    case DEACTIVATE:
    case REPORT_RECO:
    case UNINSTALL:
    case CLOSED:
      return false;

    case OPENED:
      return true;

    default:
      return state;
  }
};