import { call, put, take } from '@redux-saga/core/effects';
import { eventChannel } from '@redux-saga/core';
import { createErrorAction } from 'libs/store/actions/helpers';
import createBrowserActionListener from 'libs/webext/createBrowserActionListener';
import { Level } from '../../../../libs/utils/Logger';

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
