import { fork, delay, put, takeLatest } from 'redux-saga/effects';
import { REFRESH_CONTRIBUTORS, refreshContributors } from 'app/actions';
import minutesToMilliseconds from 'app/utils/minutesToMilliseconds';
import refreshContributorsSaga from 'app/store/sagas/refreshContributors.saga';

const refreshInterval = minutesToMilliseconds(
  Number(process.env.REFRESH_CONTRIBUTORS_INTERVAL)
);

if (refreshInterval > 0) {
  // eslint-disable-next-line no-console
  console.info(
    `Contributors will be refreshed every ${process.env.REFRESH_CONTRIBUTORS_INTERVAL} minutes.`
  );
} else {
  // eslint-disable-next-line no-console
  console.warn(
    'Contributors auto-refresh disabled:',
    'assuming "process.env.REFRESH_CONTRIBUTORS_INTERVAL" is deliberately not defined.'
  );
}

export function* refreshContributorsPeriodicallySaga() {
  yield refreshContributorsSaga();

  if (refreshInterval > 0) {
    yield delay(refreshInterval);
    yield put(refreshContributors());
  }
}

export default function*() {
  yield takeLatest(REFRESH_CONTRIBUTORS, refreshContributorsSaga);
  yield fork(refreshContributorsPeriodicallySaga);
}
