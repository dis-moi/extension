import { CLOSED, SHOW_SERVICE_MESSAGE, AppAction } from 'app/actions';

export interface ServiceMessageAction {
  label: string;
  url: string;
}

export interface ServiceMessageState {
  messages: string[];
  action: ServiceMessageAction | null;
}

const initialState: ServiceMessageState = {
  messages: [],
  action: null
};

export default (
  state: ServiceMessageState = initialState,
  action: AppAction
): ServiceMessageState => {
  switch (action.type) {
    case SHOW_SERVICE_MESSAGE: {
      return {
        messages: action.payload.messages,
        action: action.payload.action
      };
    }
    case CLOSED: {
      return {
        messages: [],
        action: null
      };
    }
    default:
      return state;
  }
};
