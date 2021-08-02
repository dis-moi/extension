import { takeLatest } from 'redux-saga/effects';
import { REFRESH_CONTRIBUTORS } from 'libs/store/actions';
import refreshContributorsSaga from 'libs/store/sagas/refreshContributors.saga';

export default function* contributorsSaga() {
  yield takeLatest(REFRESH_CONTRIBUTORS, refreshContributorsSaga);
}
