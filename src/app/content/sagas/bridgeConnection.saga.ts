import { call, takeEvery, take } from 'redux-saga/effects';
import Logger from 'app/utils/Logger';
import { StandardAction } from 'app/store/types';
import { disconnected } from 'app/store/actions/connection';
import createWindowActionChannel from 'app/store/sagas/window/createActionChannel';
import windowPostActionSaga from 'app/store/sagas/window/postAction.saga';
import createPortChannel from 'app/store/sagas/createPortChannel';
import stripReceiverMeta from 'app/store/stripReceiverMeta';

type Port = browser.runtime.Port;

export default function* bridgeConnectionSaga(targetOrigin = '*') {
  const extensionId = browser.runtime.id;
  const profilesWindowActionMatcher = (action: StandardAction) =>
    action?.meta?.receiver?.id === extensionId &&
    action?.meta?.sender?.id !== extensionId;
  const windowMessageActionChannel = createWindowActionChannel(
    window,
    targetOrigin,
    profilesWindowActionMatcher
  );
  let connected = false;
  let port: Port;
  while (true) {
    const windowAction = yield take(windowMessageActionChannel);
    if (!connected) {
      try {
        port = yield call(browser.runtime.connect, extensionId, {
          name: `profiles_${Date.now()}`
        });
        const portActionChannel = yield call(createPortChannel, port);
        yield takeEvery(
          portActionChannel,
          windowPostActionSaga,
          window,
          targetOrigin
        );
        connected = true;
      } catch (e) {
        connected = false;
      }
    }

    if (port !== undefined && connected) {
      Logger.debug('port.postMessage', stripReceiverMeta(windowAction));

      yield call([port, 'postMessage'], stripReceiverMeta(windowAction));
    } else {
      windowPostActionSaga(
        window,
        targetOrigin,
        disconnected(new Error('Something went wrong.'))
      );
    }
  }
}
