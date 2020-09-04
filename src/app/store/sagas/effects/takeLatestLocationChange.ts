import { match as Match, matchPath } from 'react-router';
import { cancel, fork, ForkEffect, take } from 'redux-saga/effects';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';

const takeLatestLocationChange = <
  Params extends { [K in keyof Params]?: string } = {}
>(
  path: string,
  worker: (match: Match<Params>) => void
): ForkEffect =>
  fork(function*() {
    let lastTask;
    while (true) {
      const action: LocationChangeAction = yield take(LOCATION_CHANGE);

      if (lastTask) {
        yield cancel(lastTask);
      }

      const match = matchPath<Params>(action.payload.location.pathname, {
        path,
        exact: true,
        strict: false
      });

      if (match) {
        lastTask = yield fork(worker, match);
      }
    }
  });

export default takeLatestLocationChange;
