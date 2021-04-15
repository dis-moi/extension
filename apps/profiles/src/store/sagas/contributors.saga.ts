import { takeLatest } from 'redux-saga/effects';
import { REFRESH_CONTRIBUTORS } from 'src/app/actions';
import refreshContributorsSaga from 'libs/store/sagas/refreshContributors.saga';

export default function* contributorsSaga() {
  yield takeLatest(REFRESH_CONTRIBUTORS, refreshContributorsSaga);
}
