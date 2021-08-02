import { fork, put, take } from 'redux-saga/effects';
import {
  CONNECT,
  connected,
  disconnected
} from 'libs/store/actions/connection';
import createWatchPortSaga from 'libs/store/sagas/watchPort.saga';
import { AppActionWithMeta } from 'libs/store/actions';
import compareMessageSender from 'libs/webext/compareMessageSender';
import createMessageSender from 'libs/webext/createMessageSender';

type MessageSender = browser.runtime.MessageSender;

export default function* connectSaga() {
  try {
    while (true) {
      const { payload: port } = yield take(CONNECT);
      if (port) {
        const sender = createMessageSender({ id: browser.runtime.id });
        yield fork(
          createWatchPortSaga,
          ({ meta }: AppActionWithMeta) =>
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
