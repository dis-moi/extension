import { fork } from 'redux-saga/effects';
import background from './background';

export default function* rootSaga() {
  yield fork(background);
}
