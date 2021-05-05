import { fork, all } from 'redux-saga/effects';
import backgroundChannel from '../../../../libs/store/sagas/backgroundChannel';
import locationChange from '../../../../libs/store/sagas/locationChange.saga';
import init from './init';
import contribution from './contribution';
import notices from './notices';
import ui from './ui';
import watchUrlsSaga from './watchUrls.saga';
import watchUnloadSaga from './watchUnload.saga';
import bridgeConnectionSaga from './bridgeConnection.saga';
import zombieTabSaga from './zombieTab.saga';

export default function* rootSaga() {
  yield all([
    fork(backgroundChannel('content')),
    fork(locationChange),
    fork(init),
    fork(contribution),
    fork(notices),
    fork(ui),
    fork(watchUrlsSaga),
    fork(watchUnloadSaga),
    fork(zombieTabSaga)
  ]);

  if (window.origin === process.env.PROFILES_ORIGIN) {
    yield fork(bridgeConnectionSaga.bind(null, process.env.PROFILES_ORIGIN));
  }
}
