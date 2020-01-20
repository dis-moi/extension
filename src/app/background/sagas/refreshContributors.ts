import { call, delay, put, select } from 'redux-saga/effects';
import { receivedContributors, refreshContributorsFailed } from 'app/actions';
import fetchContributors from 'api/fetchContributors';
import { getContributors } from '../selectors/resources';
import minutesToMilliseconds from 'app/utils/minutesToMilliseconds';

function* refreshContributors() {
  try {
    yield put(receivedContributors(yield call(fetchContributors)));
  } catch (e) {
    yield put(refreshContributorsFailed(e));
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

export function* retrieveContributorsSaga() {
  let contributors = yield select(getContributors);
  if (contributors.length === 0) {
    yield put(receivedContributors(yield call(fetchContributors)));
    contributors = yield select(getContributors);
  }

  return contributors;
}
