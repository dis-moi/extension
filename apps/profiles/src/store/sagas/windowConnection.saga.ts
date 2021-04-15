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
import { AppAction } from 'src/app/actions';
import { connect } from 'libs/store/actions/connection';
import stripReceiverMeta from 'libs/store/stripReceiverMeta';
import watchWindow from 'libs/store/sagas/window/watch.saga';
import extensionId, {
  extensionMessageSender
} from 'apps/profiles/src/extensionId';
import { isConnected } from 'apps/profiles/src/store/selectors/connection';

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
