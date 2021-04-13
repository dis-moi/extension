import { fork } from 'redux-saga/effects';
import listenActionsFromMessagesSaga from './listenActionsFromMessages';
import sendActionsToBackgroundSaga from './sendActionsToBackground';
import { From } from 'webext/From';

/**
 * This is usefull for content script and options to have an all-in-one saga
 * to handle send and receive actions from and to background.
 */
const createBackgroundChannelSaga = (from: From) =>
  function* backgroundChannelSaga() {
    yield fork(listenActionsFromMessagesSaga(from));
    yield fork(sendActionsToBackgroundSaga);
  };

export default createBackgroundChannelSaga;
