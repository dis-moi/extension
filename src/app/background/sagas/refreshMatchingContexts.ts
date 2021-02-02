import { delay, put, takeLatest, select, fork } from 'redux-saga/effects';
import {
  receivedMatchingContexts,
  REFRESH_MATCHING_CONTEXTS,
  refreshMatchingContexts,
  refreshMatchingContextsFailed,
  SUBSCRIBE,
  UNSUBSCRIBE
} from 'app/actions';
import { createCallAndRetry } from 'app/sagas/effects/callAndRetry';
import { getSubscriptions } from 'app/background/selectors/subscriptions.selectors';
import fetchMatchingContexts from 'api/fetchMatchingContexts';
import minutesToMilliseconds from 'app/utils/minutesToMilliseconds';

export function* refreshMatchingContextsSaga() {
  const callAndRetry = createCallAndRetry({
    maximumRetryDelayInMinutes: 10,
    maximumAttempts: 10,
    onError: function*(error: Error) {
      yield put(refreshMatchingContextsFailed(error));
    }
  });

  const subscriptions = yield select(getSubscriptions);
  const matchingContexts = yield callAndRetry(
    fetchMatchingContexts,
    subscriptions
  );

  if (matchingContexts) {
    yield put(receivedMatchingContexts(matchingContexts));
  }
}

export function* refreshMatchingContextsPeriodicallySaga() {
  yield put(refreshMatchingContexts());

  const refreshInterval = minutesToMilliseconds(
    Number(process.env.REFRESH_MC_INTERVAL)
  );

  // warning SSR: refresh LOOP
  if (refreshInterval > 0) {
    // eslint-disable-next-line no-console
    console.info(
      `Matching contexts will be refreshed every ${process.env.REFRESH_MC_INTERVAL} minutes.`
    );

    while (true) {
      yield delay(refreshInterval);
      yield put(refreshMatchingContexts());
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
