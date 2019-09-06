import { call, put, take } from '@redux-saga/core/effects';
import { eventChannel } from '@redux-saga/core';
import createBrowserActionListener from '../../../webext/createBrowserActionListener';
import { createErrorAction } from '../../actions';

function* watchBrowserActionSaga() {
  const channel = yield call(() => eventChannel(createBrowserActionListener));

  while (true) {
    try {
      yield put(yield take(channel));
    } catch (e) {
      createErrorAction()(e);
    }
  }
}

export default watchBrowserActionSaga;
