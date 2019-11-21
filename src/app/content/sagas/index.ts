import { fork, all } from 'redux-saga/effects';
import error from 'app/sagas/error';
import backgroundChannel from 'app/sagas/backgroundChannel';
import init from './init';
import contribution from './contribution';
import notices from './notices';
import ui from './ui';
import watchUrlsSaga from './watchUrls.saga';
import watchUnloadSaga from './watchUnload.saga';
import phoenixSaga from './phoenix.saga';

export default function* rootSaga() {
  yield all([
    fork(backgroundChannel('content')),
    fork(init),
    fork(contribution),
    fork(notices),
    fork(ui),
    fork(error),
    fork(watchUrlsSaga),
    fork(watchUnloadSaga),
    fork(phoenixSaga)
  ]);
}
