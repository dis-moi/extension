import { AppAction, OPENED, OpenFrom } from 'src/app/actions';

export interface ServiceMessageState {
  lastShownDate: null | Date;
}

export interface ServiceMessageStateSlice {
  serviceMessage: ServiceMessageState;
}

export const initialState: ServiceMessageState = {
  lastShownDate: null
};

export default (
  state: ServiceMessageState = initialState,
  action: AppAction
): ServiceMessageState => {
  if (action.type === OPENED && action.payload === OpenFrom.ServiceMessage) {
    return {
      lastShownDate: action.meta.at
    };
  }

  return state;
};
