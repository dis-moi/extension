import { fork, all } from 'redux-saga/effects';
import contributors from './contributors.saga';
import notices from './notices.saga';

export default function* rootSaga() {
  yield all([fork(contributors), fork(notices)]);
}
