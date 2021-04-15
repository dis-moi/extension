import { SERVICE_MESSAGE, AppAction } from 'src/app/actions';
import ServiceMessage from 'libs/lmem/ServiceMessage';

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
