import { fork, all } from 'redux-saga/effects';
import notices from './notices.saga';

export default function* rootSaga() {
  yield all([fork(notices)]);
}
