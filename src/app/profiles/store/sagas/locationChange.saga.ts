import { put } from 'redux-saga/effects';
import { match as Match } from 'react-router';
import { refreshContributors } from 'app/actions';
import { fetchContributorNotices } from '../actions/notices';
import { fetchContributorRequest } from 'app/actions/contributor';
import takeLatestLocationChange from 'app/store/sagas/effects/takeLatestLocationChange';

function* contributorsLocationSaga() {
  yield put(refreshContributors());
}

function* contributorLocationSaga(match: Match<{ id: string }>) {
  yield put(fetchContributorRequest(Number(match.params.id)));
  yield put(fetchContributorNotices(Number(match.params.id)));
  yield put(refreshContributors());
}

export default function* locationChangeSaga() {
  yield takeLatestLocationChange('/sources', contributorsLocationSaga);
  yield takeLatestLocationChange('/abonnements', contributorsLocationSaga);
  yield takeLatestLocationChange<{ id: string }>(
    '/sources/:id/:slug',
    contributorLocationSaga
  );
}
