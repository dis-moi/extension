import { match as Match, matchPath } from 'react-router';
import { cancel, fork, ForkEffect, take } from 'redux-saga/effects';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';

const takeLatestLocationChange = <
  Params extends { [K in keyof Params]?: string } = {}
>(
  paths: string[],
  worker: (match: Match<Params>) => void
): ForkEffect =>
  fork(function*() {
    let lastTask;
    while (true) {
      const action: LocationChangeAction = yield take(LOCATION_CHANGE);

      if (lastTask) {
        yield cancel(lastTask);
      }
      let match;
      paths.forEach((path: string) => {
        const res = matchPath<Params>(action.payload.location.pathname, {
          path,
          exact: true,
          strict: false
        });
        if (res) match = res;
      });

      if (match) {
        lastTask = yield fork(worker, match);
      }
    }
  });

export default takeLatestLocationChange;
