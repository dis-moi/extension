import { fork, all } from 'redux-saga/effects';
import createBackgroundChannelSaga from 'app/sagas/backgroundChannel';
import watchUnloadSaga from 'app/content/sagas/watchUnload.saga';
import locationChange from 'app/sagas/locationChange.saga';

export default function* rootSaga() {
  yield all([
    fork(createBackgroundChannelSaga('options')),
    fork(watchUnloadSaga),
    fork(locationChange)
  ]);
}
