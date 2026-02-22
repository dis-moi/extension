import { call, put, take } from '@redux-saga/core/effects';
import { eventChannel } from '@redux-saga/core';
import { createErrorAction } from 'libs/store/actions/helpers';
import createActionListener from 'libs/webext/createActionListener';
import { Level } from 'libs/utils/Logger';

function* watchBrowserActionSaga() {
  const channel = yield call(() => eventChannel(createActionListener));

  while (true) {
    try {
      yield put(yield take(channel));
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.ERROR }));
    }
  }
}

export default watchBrowserActionSaga;
