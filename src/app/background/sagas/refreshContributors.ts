import { fork, delay, put, takeLatest } from 'redux-saga/effects';
import {
  receivedContributors,
  REFRESH_CONTRIBUTORS,
  refreshContributors,
  refreshContributorsFailed
} from 'app/actions';
import fetchContributors from 'api/fetchContributors';
import minutesToMilliseconds from 'app/utils/minutesToMilliseconds';
import { createCallAndRetry } from '../../sagas/effects/callAndRetry';

function* refreshContributorsSaga() {
  const callAndRetry = createCallAndRetry({
    maximumRetryDelayInMinutes: 120,
    maximumAttempts: 6,
    onError: function*(error: Error) {
      yield put(refreshContributorsFailed(error));
    }
  });
  const contributors = yield callAndRetry(fetchContributors);

  if (contributors) {
    yield put(receivedContributors(contributors));
  }
}

export function* refreshContributorsPeriodicallySaga() {
  const refreshInterval = minutesToMilliseconds(
    Number(process.env.REFRESH_CONTRIBUTORS_INTERVAL)
  );

  if (refreshInterval > 0) {
    // eslint-disable-next-line no-console
    console.info(
      `Contributors will be refreshed every ${process.env.REFRESH_CONTRIBUTORS_INTERVAL} minutes.`
    );

    while (true) {
      yield put(refreshContributors());
      yield delay(refreshInterval);
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn(
      'Contributors auto-refresh disabled:',
      'assuming "process.env.REFRESH_CONTRIBUTORS_INTERVAL" is deliberately not defined.'
    );
  }
}

export default function*() {
  yield takeLatest(REFRESH_CONTRIBUTORS, refreshContributorsSaga);
  yield fork(refreshContributorsPeriodicallySaga);
}
