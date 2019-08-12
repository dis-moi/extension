import communicateWithBackgroundSaga from '../../../sagas/communicateWithBackground';

export default function* rootSaga() {
  yield communicateWithBackgroundSaga('settings');
}
