import { CLOSED, SHOW_SERVICE_MESSAGE, AppAction } from 'app/actions';
import ServiceMessage from 'app/lmem/ServiceMessage';

export type ServiceMessageState = ServiceMessage;

const initialState: ServiceMessageState = {
  messages: [],
  action: null,
  lastShownDate: null
};

export default (
  state: ServiceMessageState = initialState,
  action: AppAction
): ServiceMessageState => {
  switch (action.type) {
    case SHOW_SERVICE_MESSAGE: {
      return action.payload;
    }
    case CLOSED: {
      return {
        lastShownDate: null,
        messages: [],
        action: null
      };
    }
    default:
      return state;
  }
};
