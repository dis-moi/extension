import { take } from 'redux-saga/effects';
import { CONNECTED } from 'app/store/actions/connection';

export default function* waitForConnectionSaga() {
  yield take(CONNECTED);
}
