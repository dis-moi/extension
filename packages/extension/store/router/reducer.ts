import { History } from 'history';
import { RouterState, LOCATION_CHANGE, LocationChangeAction } from './types';

export const connectRouter = (history: History) => {
  const initialState: RouterState = {
    location: history.location,
    action: history.action,
  };

  return (
    state: RouterState = initialState,
    action: LocationChangeAction,
  ): RouterState => {
    if (action.type === LOCATION_CHANGE) {
      return {
        location: action.payload.location,
        action: action.payload.action,
      };
    }
    return state;
  };
};
