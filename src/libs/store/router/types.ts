import { Location, Action } from 'history';

export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export interface LocationChangePayload {
  location: Location;
  action: Action;
  isFirstRendering: boolean;
}

export interface LocationChangeAction {
  type: typeof LOCATION_CHANGE;
  payload: LocationChangePayload;
}

export interface RouterState {
  location: Location;
  action: Action;
}

export interface RouterRootState {
  router: RouterState;
}
