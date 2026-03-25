import { Location, Action, Path } from 'history';
import { LocationChangeAction, LOCATION_CHANGE } from './types';

export { LOCATION_CHANGE };

export const onLocationChanged = (
  location: Location,
  action: Action,
  isFirstRendering = false
): LocationChangeAction => ({
  type: LOCATION_CHANGE,
  payload: { location, action, isFirstRendering }
});

// Navigation action types
const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

interface CallHistoryMethodAction {
  type: typeof CALL_HISTORY_METHOD;
  payload: {
    method: string;
    args: unknown[];
  };
}

const updateLocation = (method: string) => (
  ...args: unknown[]
): CallHistoryMethodAction => ({
  type: CALL_HISTORY_METHOD,
  payload: { method, args }
});

export const push = updateLocation('push') as (
  path: Path
) => CallHistoryMethodAction;
export const replace = updateLocation('replace') as (
  path: Path
) => CallHistoryMethodAction;
export const go = updateLocation('go') as (
  n: number
) => CallHistoryMethodAction;
export const goBack = updateLocation('goBack') as () => CallHistoryMethodAction;
export const goForward = updateLocation(
  'goForward'
) as () => CallHistoryMethodAction;

export { CALL_HISTORY_METHOD, CallHistoryMethodAction };
