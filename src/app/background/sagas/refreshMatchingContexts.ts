import { debounce, delay, fork, put, select } from 'redux-saga/effects';
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

const refreshInterval = minutesToMilliseconds(
  Number(process.env.REFRESH_MC_INTERVAL)
);

if (refreshInterval > 0) {
  // eslint-disable-next-line no-console
  console.info(
    `Matching contexts will be refreshed every ${process.env.REFRESH_MC_INTERVAL} minutes.`
  );
} else {
  // eslint-disable-next-line no-console
  console.warn(
    'Matching contexts auto-refresh disabled:',
    'assuming "process.env.REFRESH_MC_INTERVAL" is deliberately not defined.'
  );
}

const callAndRetry = createCallAndRetry({
  maximumRetryDelayInMinutes: 10,
  onError: function*(error: Error) {
    yield put(refreshMatchingContextsFailed(error));
  }
});

export function* refreshMatchingContextsSaga() {
  const subscriptions = yield select(getSubscriptions);

  const matchingContexts = yield callAndRetry(
    fetchMatchingContexts,
    subscriptions
  );

  if (matchingContexts) {
    yield put(receivedMatchingContexts(matchingContexts));
  }

  if (refreshInterval > 0) {
    yield delay(refreshInterval);
    yield put(refreshMatchingContexts());
  }
}

export default function* refreshMatchingContextsRootSaga() {
  yield refreshMatchingContextsSaga();
  yield debounce(
    30_000,
    [SUBSCRIBE, UNSUBSCRIBE, REFRESH_MATCHING_CONTEXTS],
    refreshMatchingContextsSaga
  );
}
