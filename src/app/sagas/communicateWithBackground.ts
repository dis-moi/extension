import { fork } from 'redux-saga/effects';
import { From } from 'webext/From';
import listenActionsFromMessagesSaga from './listenActionsFromMessages';
import sendActionsToBackgroundSaga from './sendActionsToBackground';

/**
 * This is usefull for content script and settings to have an all-in-one saga
 * to handle send and receive actions from and to background.
 */
export default (from: From) =>
  function* communicateWithBackgroundSaga() {
    yield fork(listenActionsFromMessagesSaga(from));
    yield fork(sendActionsToBackgroundSaga);
  };
