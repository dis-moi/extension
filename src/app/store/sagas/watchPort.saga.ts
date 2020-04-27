import * as R from 'ramda';
import {
  put,
  call,
  take,
  takeLatest,
  ActionPattern,
  cancel
} from 'redux-saga/effects';
import createPortChannel from './createPortChannel';
import { disconnected } from 'app/store/actions/connection';
import { PortAction } from 'app/store/types';

type MessageSender = browser.runtime.MessageSender;
type Port = browser.runtime.Port;

const stripReceiverMeta = R.dissocPath<PortAction>(['meta', 'receiver']);

export const createActionForwarder = (port: Port) =>
  function* forwardAppAction(action: PortAction) {
    yield call([port, 'postMessage'], stripReceiverMeta(action));
  };

export const compareMessageSender = (
  senderA?: MessageSender,
  senderB?: MessageSender
): boolean => {
  return (
    !!senderA &&
    !!senderB &&
    (R.eqBy(R.path(['tab', 'id']), senderA, senderB) ||
      R.eqProps('id', senderA, senderB))
  );
};

function* watchPortSaga(pattern: ActionPattern, port: Port) {
  const portChannel = yield call(createPortChannel, port);
  const forwardActionSaga = yield takeLatest(
    pattern,
    createActionForwarder(port)
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
    yield cancel(forwardActionSaga);
    yield put(disconnected(new Error('Channel disconnected')));
  }
}

export default watchPortSaga;
