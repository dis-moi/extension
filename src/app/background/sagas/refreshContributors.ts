import { call, delay, put } from 'redux-saga/effects';
import { receivedContributors, refreshContributorsFailed } from 'app/actions';
import fetchContributors from 'api/fetchContributors';
import minutesToMilliseconds from 'app/utils/minutesToMilliseconds';
import { regressiveRetry } from '../../sagas/effects/regressiveRetry';

function* refreshContributors() {
  const contributors = yield call(
    regressiveRetry,
    {
      maximumRetryDelayInMinutes: 120,
      maximumAttempts: 6,
      onError: function*(error: Error) {
        yield put(refreshContributorsFailed(error));
      }
    },
    fetchContributors
  );

  if (contributors) {
    yield put(receivedContributors(contributors));
  }
}

export default function* refreshContributorsSaga() {
  yield call(refreshContributors);

  const refreshInterval = minutesToMilliseconds(
    Number(process.env.REFRESH_CONTRIBUTORS_INTERVAL)
  );

  if (refreshInterval > 0) {
    // eslint-disable-next-line no-console
    console.info(
      `Contributors will be refreshed every ${process.env.REFRESH_CONTRIBUTORS_INTERVAL} minutes.`
    );

    while (true) {
      yield delay(refreshInterval);
      yield call(refreshContributors);
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn(
      'Contributors auto-refresh disabled:',
      'assuming "process.env.REFRESH_CONTRIBUTORS_INTERVAL" is deliberately not defined.'
    );
  }
}
