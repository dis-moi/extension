import { put, takeLatest } from 'redux-saga/effects';
import { INIT } from '../../constants/ActionTypes';
import { updateInstalledDetails } from 'app/actions/filters';
import { InitAction } from 'app/actions/tabs';

export function* handleInitSaga({ payload: installationDetails }: InitAction) {
  yield put(updateInstalledDetails(installationDetails));
}

export default function* initSaga() {
  yield takeLatest(INIT, handleInitSaga);
}
