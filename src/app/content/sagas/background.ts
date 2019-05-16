import { put, takeLatest, fork } from 'redux-saga/effects';
import watchSingleMessageSaga from '../../utils/watchSingleMessageSaga';
import { INIT } from '../../constants/ActionTypes';
import { updateInstalledDetails } from 'app/actions/filters';
import { InitAction } from 'app/actions/tabs';

export function* initSaga({ payload: { installationDetails } }: InitAction) {
  yield put(updateInstalledDetails(installationDetails));
}

export default function* backgroundRootSaga() {
  yield fork(watchSingleMessageSaga);

  yield takeLatest(INIT, initSaga);
}
