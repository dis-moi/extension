import {
  put,
  call,
  take,
  takeLatest,
  ActionPattern,
  cancel
} from 'redux-saga/effects';
import createPortChannel from './createPortChannel';
import { disconnected } from 'libs/store/actions/connection';
import { PortAction } from 'libs/store/types';
import stripReceiverMeta from '../stripReceiverMeta';
import addSenderMeta from '../addSenderMeta';

type MessageSender = browser.runtime.MessageSender;
type Port = browser.runtime.Port;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
function* postPortActionSaga(
  port: Port,
  sender?: MessageSender,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  action: PortAction
) {
  yield call(
    [port, 'postMessage'],
    addSenderMeta<PortAction>(stripReceiverMeta(action))(sender)
  );
}

/**
 * @todo would love to see an implementation of this with `redux-saga` `stdChannel` or `multicastChannel`,
 * but didn't manage to get it working. Documentation is scarce on these aspects...
 * @see https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/UsingRunSaga.md
 */
function* watchPortSaga(
  pattern: ActionPattern,
  port: Port,
  sender?: MessageSender
) {
  const portChannel = yield call(createPortChannel, port);
  const postPortActionSagaTaker = yield takeLatest(
    pattern,
    postPortActionSaga,
    port,
    sender
  );

  try {
    while (true) {
      const channelAction = yield take(portChannel);
      yield put(channelAction);
    }
  } catch (e) {
    // The error is silenced on purpose. Avoid polluting with an extra disconnected action.
    // The reason the channel closes is not very useful.
    // yield put(disconnected(e));
  } finally {
    yield cancel(postPortActionSagaTaker);
    yield put(disconnected(new Error('Channel disconnected')));
  }
}

export default watchPortSaga;
