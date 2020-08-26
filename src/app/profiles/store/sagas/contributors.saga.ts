import { takeLatest } from 'redux-saga/effects';
import { REFRESH_CONTRIBUTORS } from 'app/actions';
import refreshContributorsSaga from 'app/store/sagas/refreshContributors.saga';

export default function* contributorsSaga() {
  yield takeLatest(REFRESH_CONTRIBUTORS, refreshContributorsSaga);
}
