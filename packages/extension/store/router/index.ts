/**
 * Replacement module for connected-react-router.
 *
 * Provides the same public API (ConnectedRouter, connectRouter,
 * routerMiddleware, navigation action creators, LOCATION_CHANGE, getLocation)
 * but implemented directly on top of the `history` library, without the
 * connected-react-router dependency.
 */

export { default as ConnectedRouter } from './ConnectedRouter';
export { connectRouter } from './reducer';
export { routerMiddleware } from './middleware';
export {
  push,
  replace,
  go,
  goBack,
  goForward,
  LOCATION_CHANGE,
} from './actions';
export { getLocation } from './selectors';

export {
  LocationChangeAction,
  LocationChangePayload,
  RouterRootState,
  RouterState,
} from './types';
