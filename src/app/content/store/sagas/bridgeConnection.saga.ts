import { call, takeEvery, take } from 'redux-saga/effects';
import Logger from 'libs/utils/Logger';
import {
  MetaWithReceiver,
  MetaWithSender,
  StandardAction
} from 'libs/store/types';
import { disconnected } from 'libs/store/actions/connection';
import createWindowActionChannel from 'libs/store/sagas/window/createActionChannel';
import windowPostActionSaga from 'libs/store/sagas/window/postAction.saga';
import createPortChannel from 'libs/store/sagas/createPortChannel';
import stripReceiverMeta from 'libs/store/stripReceiverMeta';

type Port = browser.runtime.Port;

export default function* bridgeConnectionSaga(targetOrigin = '*') {
  const extensionId =
    process.env.NODE_ENV === 'development' &&
    /firefox/i.test(navigator.userAgent)
      ? ''
      : browser.runtime.id;
  const profilesWindowActionMatcher = (action: StandardAction) =>
    (action?.meta as MetaWithReceiver)?.receiver?.id === extensionId &&
    (action?.meta as MetaWithSender)?.sender?.id !== extensionId;
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
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
