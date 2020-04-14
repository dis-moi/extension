import { delay, put, takeLatest, select, fork } from 'redux-saga/effects';
import {
  REFRESH_MATCHING_CONTEXTS,
  refreshMatchingContexts,
  SUBSCRIBE,
  UNSUBSCRIBE
} from 'app/actions';
import refreshMatchingContextsSaga from 'app/store/sagas/refreshMatchingContexts.saga';
import { getSubscriptions } from '../selectors/subscriptions.selectors';
import minutesToMilliseconds from 'app/utils/minutesToMilliseconds';

export function* refreshMatchingContextsPeriodicallySaga() {
  const subscriptions = yield select(getSubscriptions);
  yield put(refreshMatchingContexts(subscriptions));

  const refreshInterval = minutesToMilliseconds(
    Number(process.env.REFRESH_MC_INTERVAL)
  );

  if (refreshInterval > 0) {
    // eslint-disable-next-line no-console
    console.info(
      `Matching contexts will be refreshed every ${refreshInterval /
        1000 /
        60} minutes.`
    );

    while (true) {
      yield delay(refreshInterval);
      yield put(refreshMatchingContexts(subscriptions));
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn(
      'Matching contexts auto-refresh disabled:',
      'assuming "process.env.REFRESH_MC_INTERVAL" is deliberately not defined.'
    );
  }
}

export default function* refreshMatchingContextsRootSaga() {
  yield takeLatest(
    [SUBSCRIBE, UNSUBSCRIBE, REFRESH_MATCHING_CONTEXTS],
    refreshMatchingContextsSaga
  );
  yield fork(refreshMatchingContextsPeriodicallySaga);
}
