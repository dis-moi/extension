import { call, delay, put } from 'redux-saga/effects';
import {
  receivedMatchingContexts,
  refreshMatchingContextsFailed
} from 'app/actions';
import fetchMatchingContexts from 'api/fetchMatchingContexts';

function* refreshMatchingContexts() {
  try {
    yield put(receivedMatchingContexts(yield call(fetchMatchingContexts)));
  } catch (e) {
    yield put(refreshMatchingContextsFailed(e));
  }
}

export default function* refreshMatchingContextsSaga() {
  yield call(refreshMatchingContexts);

  const refreshInterval = Number(process.env.REFRESH_MC_INTERVAL);

  if (refreshInterval > 0) {
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
    console.warn(
      'Matching contexts auto-refresh disabled:',
      'assuming "process.env.REFRESH_MC_INTERVAL" is deliberately not defined.'
    );
  }
}
