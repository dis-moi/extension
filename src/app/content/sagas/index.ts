import { fork, all } from 'redux-saga/effects';
import background from './background';
import browserAction from './browserAction';
import contribution from './contribution';
import notices from './notices';
import ui from './ui';
import error from '../../sagas/error';

export default function* rootSaga() {
  yield all([
    fork(background),
    fork(browserAction),
    fork(contribution),
    fork(notices),
    fork(ui),
    fork(error)
  ]);
}
