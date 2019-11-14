import { fork, all } from 'redux-saga/effects';
import createBackgroundChannelSaga from 'app/sagas/backgroundChannel';
import watchUnloadSaga from '../../../content/sagas/watchUnload.saga';

export default function* rootSaga() {
  yield all([
    fork(createBackgroundChannelSaga('options')),
    fork(watchUnloadSaga)
  ]);
}
