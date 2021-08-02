import { put, takeLatest } from 'redux-saga/effects';
import {
  updateInstallationDetails,
  InitAction,
  INIT
} from 'libs/store/actions';

export function* handleInitSaga({ payload: installationDetails }: InitAction) {
  yield put(
    updateInstallationDetails(installationDetails, { sendToTab: true })
  );
}

export default function* initSaga() {
  yield takeLatest(INIT, handleInitSaga);
}
