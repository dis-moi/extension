import { AppAction, SHOW_BULLES_UPDATE_SERVICE_MESSAGE } from 'app/actions';

export interface ServiceMessageState {
  showUpdateMessage: boolean;
}

const initialState: ServiceMessageState = {
  showUpdateMessage: false
};

export default (
  state: ServiceMessageState = initialState,
  action: AppAction
): ServiceMessageState => {
  switch (action.type) {
    case SHOW_BULLES_UPDATE_SERVICE_MESSAGE: {
      return {
        showUpdateMessage: true
      };
    }
    case 'CLOSED': {
      return {
        showUpdateMessage: false
      };
    }
    default:
      return state;
  }
};
