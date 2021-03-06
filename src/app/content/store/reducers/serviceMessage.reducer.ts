import { SERVICE_MESSAGE, AppAction } from 'libs/store/actions';
import ServiceMessage from 'libs/domain/ServiceMessage';

export type ServiceMessageState = ServiceMessage;

const initialState: ServiceMessageState = {
  messages: []
};

export default (
  state: ServiceMessageState = initialState,
  action: AppAction
): ServiceMessageState => {
  switch (action.type) {
    case SERVICE_MESSAGE: {
      return action.payload;
    }
    default:
      return state;
  }
};
