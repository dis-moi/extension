import { call, delay, put } from 'redux-saga/effects';
import { receivedContributors, refreshContributorsFailed } from 'app/actions';
import fetchContributors from 'api/fetchContributors';

function* refreshContributors() {
  try {
    yield put(receivedContributors(yield call(fetchContributors)));
  } catch (e) {
    yield put(refreshContributorsFailed(e));
  }
}

export default function* refreshContributorsSaga() {
  yield call(refreshContributors);

  const refreshInterval = Number(process.env.REFRESH_CONTRIBUTORS_INTERVAL);

  if (refreshInterval > 0) {
    // eslint-disable-next-line no-console
    console.info(
      `Contributors will be refreshed every ${refreshInterval /
        1000 /
        60} minutes.`
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
