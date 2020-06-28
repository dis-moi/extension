import Logger from 'app/utils/Logger';
import { apply } from 'redux-saga/effects';
import { StandardAction } from 'app/store/types';

export default function* postActionSaga(
  window: Window,
  targetOrigin = '*',
  action: StandardAction
) {
  Logger.debug(`window.postMessage`, action);

  yield apply(window, window.postMessage, [action, targetOrigin]);
}
