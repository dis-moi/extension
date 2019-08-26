import { fork, all } from 'redux-saga/effects';
import errorSaga from 'app/sagas/error';
import createBackgroundChannelSaga from 'app/sagas/backgroundChannel';
import initSaga from './init';
import browserActionSaga from './browserAction';
import noticesSaga from './notices';
import uiSaga from './ui';

export default function* rootSaga() {
  yield all([
    fork(createBackgroundChannelSaga('content')),
    fork(initSaga),
    fork(browserActionSaga),
    fork(noticesSaga),
    fork(uiSaga),
    fork(errorSaga)
  ]);
}
