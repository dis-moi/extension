import { fork, all } from 'redux-saga/effects';
import matchingContexts from './matchingContexts';
import tab from './tab';

export default function* rootSaga() {
  yield all([
    fork(matchingContexts),
    fork(tab),
  ]);
}
