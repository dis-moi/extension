import { call, delay, fork, put, select, takeLatest } from 'redux-saga/effects';
import { AppActionWithMeta } from 'libs/store/actions';
import { connect, CONNECT, disconnected } from 'libs/store/actions/connection';
import watchPortSaga from 'libs/store/sagas/watchPort.saga';
import Logger from 'libs/utils/Logger';
import extensionId from 'app/profiles/extensionId';
import { isConnected, isConnecting } from '../selectors/connection';

export function* connectSaga() {
  Logger.info(`Connecting to extension ${extensionId}`);

  try {
    const port = yield call(browser.runtime.connect, extensionId, {
      name: `profiles_${Date.now()}`
    });
    yield fork(
      watchPortSaga,
      ({ meta }: AppActionWithMeta) => meta?.receiver?.id === extensionId,
      port
    );
  } catch (e) {
    yield put(disconnected(e));
  }
}

function* attemptToConnectPeriodicallySaga() {
  const attemptInterval = 5000;
  while (true) {
    const connecting = yield select(isConnecting);
    const connected = yield select(isConnected);
    if (!connecting && !connected) {
      yield put(connect());
    }
    yield delay(attemptInterval);
  }
}

export default function* portConnectionSaga() {
  yield takeLatest(CONNECT, connectSaga);
  yield fork(attemptToConnectPeriodicallySaga);
}
