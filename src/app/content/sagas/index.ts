import { fork, all } from 'redux-saga/effects';
import errorSaga from 'app/sagas/error';
import communicateWithBackgroundSaga from 'app/sagas/communicateWithBackground';
import initSaga from './init';
import browserActionSaga from './browserAction';
import noticesSaga from './notices';
import uiSaga from './ui';

export default function* rootSaga() {
  yield all([
    fork(communicateWithBackgroundSaga('content')),
    fork(initSaga),
    fork(browserActionSaga),
    fork(noticesSaga),
    fork(uiSaga),
    fork(errorSaga)
  ]);
}
