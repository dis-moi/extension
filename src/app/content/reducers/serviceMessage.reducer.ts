import { CLOSED, SHOW_SERVICE_MESSAGE, AppAction } from 'app/actions';

export interface Action {
  label: string;
  url: string;
}

export interface ServiceMessageState {
  serviceMessage: string | null;
  action: Action | null;
}

const initialState: ServiceMessageState = {
  serviceMessage: null,
  action: null
};

export default (
  state: ServiceMessageState = initialState,
  action: AppAction
): ServiceMessageState => {
  switch (action.type) {
    case SHOW_SERVICE_MESSAGE: {
      return {
        serviceMessage: action.payload.message,
        action: action.payload.action
      };
    }
    case CLOSED: {
      return {
        serviceMessage: null,
        action: null
      };
    }
    default:
      return state;
  }
};
