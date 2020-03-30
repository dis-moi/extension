import { call, delay, put, fork, takeLatest, select } from 'redux-saga/effects';
import fetchMatchingContexts from 'api/fetchMatchingContexts';
import {
  receivedMatchingContexts,
  refreshMatchingContextsFailed,
  SUBSCRIBE,
  UNSUBSCRIBE
} from 'app/actions';
import { getSubscriptions } from '../selectors/subscriptions.selectors';
import minutesToMilliseconds from 'app/utils/minutesToMilliseconds';
import { createCallAndRetry } from '../../sagas/effects/callAndRetry';

function* refreshMatchingContexts() {
  const callAndRetry = createCallAndRetry({
    maximumRetryDelayInMinutes: 10,
    maximumAttempts: 10,
    onError: function*(error: Error) {
      yield put(refreshMatchingContextsFailed(error));
    }
  });
  const matchingContexts = yield callAndRetry(
    fetchMatchingContexts,
    yield select(getSubscriptions)
  );

  if (matchingContexts) {
    yield put(receivedMatchingContexts(matchingContexts));
  }
}

function* refreshWhenSubscriptionsChanged() {
  yield takeLatest([SUBSCRIBE, UNSUBSCRIBE], refreshMatchingContexts);
}

export default function* refreshMatchingContextsSaga() {
  yield fork(refreshWhenSubscriptionsChanged);
  yield call(refreshMatchingContexts);

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
      yield call(refreshMatchingContexts);
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn(
      'Matching contexts auto-refresh disabled:',
      'assuming "process.env.REFRESH_MC_INTERVAL" is deliberately not defined.'
    );
  }
}
