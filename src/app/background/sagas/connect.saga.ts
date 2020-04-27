import { take, fork, put } from 'redux-saga/effects';
import { CONNECT, connected, disconnected } from 'app/store/actions/connection';
import createWatchPortSaga, {
  compareMessageSender
} from 'app/store/sagas/watchPort.saga';
import { AppAction } from 'app/actions';

type MessageSender = browser.runtime.MessageSender;

export default function* connectSaga() {
  try {
    while (true) {
      const { payload: port } = yield take(CONNECT);
      if (port) {
        yield fork(
          createWatchPortSaga,
          ({ meta }: AppAction) =>
            compareMessageSender(meta?.receiver as MessageSender, port.sender),
          port
        );
        yield put(connected({ receiver: port.sender }));
      }
    }
  } catch (e) {
    yield put(disconnected(e));
  }
}
