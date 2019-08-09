import { fork, all } from 'redux-saga/effects';
import communicateWithBackgroundSaga from '../../../sagas/communicateWithBackground';

export default function* rootSaga() {
  yield all([fork(communicateWithBackgroundSaga('settings'))]);
}
