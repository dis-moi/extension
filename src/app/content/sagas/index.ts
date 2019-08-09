import { fork, all } from 'redux-saga/effects';
import error from 'app/sagas/error';
import communicateWithBackgroundSaga from 'app/sagas/communicateWithBackground';
import initSaga from './init';
import browserAction from './browserAction';
import notices from './notices';
import ui from './ui';

export default function* rootSaga() {
  yield all([
    fork(communicateWithBackgroundSaga('content')),
    fork(initSaga),
    fork(browserAction),
    fork(notices),
    fork(ui),
    fork(error)
  ]);
}
