import { put, takeLatest } from 'redux-saga/effects';
import { REFRESH_CONTRIBUTORS, refreshContributors } from 'app/actions';
import refreshContributorsSaga from 'app/store/sagas/refreshContributors.saga';

export default function* contributorsSaga() {
  yield takeLatest(REFRESH_CONTRIBUTORS, refreshContributorsSaga);
  yield put(refreshContributors());
}
