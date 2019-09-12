import { put, takeLatest } from 'redux-saga/effects';
import { updateInstallationDetails, InitAction, INIT } from 'app/actions';

export function* handleInitSaga({ payload: installationDetails }: InitAction) {
  yield put(updateInstallationDetails(installationDetails));
}

export default function* initSaga() {
  yield takeLatest(INIT, handleInitSaga);
}
