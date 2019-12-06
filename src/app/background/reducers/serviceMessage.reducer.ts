import { AppAction, SHOW_SERVICE_MESSAGE } from 'app/actions';

export interface ServiceMessageState {
  lastShownDate: null | Date;
}

export interface ServiceMessageStateSlice {
  serviceMessage: ServiceMessageState;
}

const initialState: ServiceMessageState = {
  lastShownDate: null
};

export default (
  state: ServiceMessageState = initialState,
  action: AppAction
): ServiceMessageState => {
  switch (action.type) {
    case SHOW_SERVICE_MESSAGE: {
      return {
        lastShownDate: action.payload.date
      };
    }

    default:
      return state;
  }
};
