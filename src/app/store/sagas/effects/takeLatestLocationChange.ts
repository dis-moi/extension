import { match as Match, matchPath } from 'react-router';
import { ForkEffect, cancel, fork, take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import { StandardAction } from 'app/store/types';

const takeLatestLocationChange = <
  Params extends { [K in keyof Params]?: string } = {}
>(
  path: string,
  worker: (match: Match<Params>) => void
): ForkEffect =>
  fork(function*() {
    let lastTask;
    while (true) {
      const action = yield take(
        (a: StandardAction) => a.type === LOCATION_CHANGE
      );

      if (lastTask) {
        yield cancel(lastTask);
      }

      const match = matchPath<Params>(action?.payload?.location?.pathname, {
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
