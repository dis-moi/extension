import { put, takeLatest } from 'redux-saga/effects';
import { INIT } from '../../constants/ActionTypes';
import { updateInstallationDetails } from 'app/actions';
import { InitAction } from 'app/actions/tabs';

export function* handleInitSaga({ payload: installationDetails }: InitAction) {
  yield put(updateInstallationDetails(installationDetails));
}

export default function* initSaga() {
  yield takeLatest(INIT, handleInitSaga);
}
