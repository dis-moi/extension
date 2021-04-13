import { call, delay, fork, put, select, takeLatest } from 'redux-saga/effects';
import { AppActionWithMeta } from 'app/actions';
import { connect, CONNECT, disconnected } from 'app/store/actions/connection';
import watchPortSaga from 'app/store/sagas/watchPort.saga';
import extensionId from 'app/profiles/extensionId';
import { isConnected, isConnecting } from '../selectors/connection';

export function* connectSaga() {
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
