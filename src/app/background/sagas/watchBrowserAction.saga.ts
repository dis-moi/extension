import { call, put, take } from '@redux-saga/core/effects';
import { eventChannel } from '@redux-saga/core';
import { createErrorAction } from 'app/actions';
import createBrowserActionListener from 'webext/createBrowserActionListener';
import { Level } from '../../utils/Logger';

function* watchBrowserActionSaga() {
  const channel = yield call(() => eventChannel(createBrowserActionListener));

  while (true) {
    try {
      yield put(yield take(channel));
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.ERROR }));
    }
  }
}

export default watchBrowserActionSaga;
