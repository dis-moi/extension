import { put, select } from 'redux-saga/effects';
import { match as Match } from 'react-router';
import { refreshContributors } from 'app/actions';
import { fetchContributorNotices } from '../actions/notices';
import { fetchContributorRequest } from 'app/actions/contributor';
import takeLatestLocationChange from 'app/store/sagas/effects/takeLatestLocationChange';
import { getContributorNoticesFetchedCount } from '../selectors';

function* contributorsLocationSaga() {
  yield put(refreshContributors());
}

function* contributorLocationSaga(match: Match<{ id: string }>) {
  yield put(fetchContributorRequest(Number(match.params.id)));
  const fetchedCount = yield select(
    getContributorNoticesFetchedCount,
    Number(match.params.id)
  );
  if (!fetchedCount) {
    yield put(fetchContributorNotices(Number(match.params.id)));
  }
  yield put(refreshContributors());
}

export default function* locationChangeSaga() {
  yield takeLatestLocationChange('/informateurs', contributorsLocationSaga);
  yield takeLatestLocationChange<{ id: string }>(
    '/informateurs/:id/:slug',
    contributorLocationSaga
  );
}
