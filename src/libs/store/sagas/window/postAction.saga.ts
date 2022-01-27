import { apply } from 'redux-saga/effects';
import Logger from 'libs/utils/Logger';
import { StandardAction } from 'libs/store/types';

export default function* postActionSaga(
  window: Window,
  targetOrigin = '*',
  action: StandardAction
) {
  Logger.debug(`window.postMessage`, action, targetOrigin);

  yield apply(window, window.postMessage, [action, targetOrigin]);
}
