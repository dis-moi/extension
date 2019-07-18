import { put, call, take } from 'redux-saga/effects';
import createExternalMessageChannel from '../services/createExternalMessageChannel';
import { createErrorAction } from '../../actions';

export default function* watchExternalMessageChannel() {
  const singleMessageChannel = yield call(createExternalMessageChannel);

  while (true) {
    try {
      const action = yield take(singleMessageChannel);
      yield put(action);
    } catch (e) {
      yield put(createErrorAction()(e));
    }
  }
}
