import { call, delay, put, fork, takeLatest, select } from 'redux-saga/effects';
import fetchMatchingContexts from 'api/fetchMatchingContexts';
import {
  receivedMatchingContexts,
  refreshMatchingContextsFailed,
  SUBSCRIBE,
  UNSUBSCRIBE
} from 'app/actions';
import { getSubscriptions } from '../selectors/subscriptions.selectors';

function* refreshMatchingContexts() {
  try {
    const subscriptions = yield select(getSubscriptions);
    const matchingContexts =
      subscriptions > 0 ? yield call(fetchMatchingContexts, subscriptions) : [];
    yield put(receivedMatchingContexts(matchingContexts));
  } catch (e) {
    yield put(refreshMatchingContextsFailed(e));
  }
}

function* refreshWhenSubscriptionsChanged() {
  yield takeLatest([SUBSCRIBE, UNSUBSCRIBE], refreshMatchingContexts);
}

function* refreshEveryInterval() {
  const refreshInterval = Number(process.env.REFRESH_MC_INTERVAL);

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

export default function* refreshMatchingContextsSaga() {
  yield call(refreshMatchingContexts);

  yield fork(refreshWhenSubscriptionsChanged);
  yield fork(refreshEveryInterval);
}
