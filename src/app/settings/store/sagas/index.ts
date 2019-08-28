import { fork } from 'redux-saga/effects';
import createBackgroundChannelSaga from 'app/sagas/backgroundChannel';

export default function* rootSaga() {
  yield fork(createBackgroundChannelSaga('settings'));
}
