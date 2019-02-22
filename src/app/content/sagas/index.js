import { fork, all } from 'redux-saga/effects';
import background from './background';
import browserAction from './browserAction';
import ui from './ui';

export default function* rootSaga() {
  yield all([
    fork(ui),
    fork(background),
    fork(browserAction),
  ]);
}
