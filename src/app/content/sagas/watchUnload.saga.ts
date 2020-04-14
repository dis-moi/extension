import { call, put, take } from '@redux-saga/core/effects';
import { eventChannel } from '@redux-saga/core';
import { createErrorAction } from 'app/actions/helpers';
import createUnloadListener from 'webext/createUnloadListener';
import { Level } from '../../utils/Logger';

function* watchUnloadSaga() {
  const channel = yield call(() => eventChannel(createUnloadListener));

  while (true) {
    try {
      yield put(yield take(channel));
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.ERROR }));
    }
  }
}

export default watchUnloadSaga;
