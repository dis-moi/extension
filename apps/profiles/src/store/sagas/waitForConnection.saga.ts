import { take } from 'redux-saga/effects';
import { CONNECTED } from 'libs/store/actions/connection';

export default function* waitForConnectionSaga() {
  yield take(CONNECTED);
}
