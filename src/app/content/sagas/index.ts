import { fork, all } from 'redux-saga/effects';
import backgroundChannel from 'app/sagas/backgroundChannel';
import locationChange from 'app/sagas/locationChange.saga';
import init from './init';
import contribution from './contribution';
import question from './question';
import notices from './notices';
import ui from './ui';
import watchUrlsSaga from './watchUrls.saga';
import watchUnloadSaga from './watchUnload.saga';
import zombieTabSaga from './zombieTab.saga';

export default function* rootSaga() {
  yield all([
    fork(backgroundChannel('content')),
    fork(locationChange),
    fork(init),
    fork(contribution),
    fork(question),
    fork(notices),
    fork(ui),
    fork(watchUrlsSaga),
    fork(watchUnloadSaga),
    fork(zombieTabSaga)
  ]);
}
