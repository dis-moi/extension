import { channel } from 'redux-saga';
import {
  put,
  call,
  delay,
  fork,
  takeEvery,
  select,
  actionChannel
} from 'redux-saga/effects';
import { AppAction } from 'app/actions';
import { connect } from 'app/store/actions/connection';
import stripReceiverMeta from 'app/store/stripReceiverMeta';
import watchWindow from 'app/store/sagas/window/watch.saga';
import extensionId, { extensionMessageSender } from 'app/profiles/extensionId';
import { isConnected } from 'app/profiles/store/selectors/connection';

function* dispatchReceivedActionSaga(action: AppAction) {
  yield put(stripReceiverMeta(action));
}

export default function* windowConnectionSaga(targetOrigin = '*') {
  const incomingChannel = yield call(channel);
  const outgoingChannel = yield actionChannel(
    ({ meta }: AppAction) => meta?.receiver?.id === extensionId
  );
  yield fork(
    watchWindow,
    window,
    targetOrigin,
    incomingChannel,
    outgoingChannel
  );
  yield takeEvery(incomingChannel, dispatchReceivedActionSaga);

  const attemptInterval = 5000;
  while (true) {
    const connected = yield select(isConnected);
    if (!connected) {
      yield put(
        connect(undefined, {
          receiver: extensionMessageSender
        })
      );
    }
    yield delay(attemptInterval);
  }
}
