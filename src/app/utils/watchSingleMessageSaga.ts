import { put, call, take } from 'redux-saga/effects';
import createSingleMessageChannel from './createSingleMessageChannel';

export default function* watchSingleMessage() {
  const singleMessageChannel = yield call(createSingleMessageChannel);

  while (true) {
    try {
      const action = yield take(singleMessageChannel);
      yield put(action);
    } catch (e) {
      console.error(e);
    }
  }
}
