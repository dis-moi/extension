import createBackgroundChannelSaga from 'app/sagas/backgroundChannel';

export default function* rootSaga() {
  yield createBackgroundChannelSaga('settings');
}
