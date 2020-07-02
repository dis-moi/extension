import { take, fork, put } from 'redux-saga/effects';
import { CONNECT, connected, disconnected } from 'app/store/actions/connection';
import createWatchPortSaga from 'app/store/sagas/watchPort.saga';
import { AppAction } from 'app/actions';
import compareMessageSender from 'webext/compareMessageSender';
import createMessageSender from 'webext/createMessageSender';

type MessageSender = browser.runtime.MessageSender;

export default function* connectSaga() {
  try {
    while (true) {
      const { payload: port } = yield take(CONNECT);
      if (port) {
        const sender = createMessageSender({ id: browser.runtime.id });
        yield fork(
          createWatchPortSaga,
          ({ meta }: AppAction) =>
            compareMessageSender(meta?.receiver as MessageSender, port.sender),
          port,
          sender
        );
        yield put(connected({ receiver: port.sender }));
      }
    }
  } catch (e) {
    yield put(disconnected(e));
  }
}
