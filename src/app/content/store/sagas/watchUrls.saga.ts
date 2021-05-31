import { call, put, take } from '@redux-saga/core/effects';
import { eventChannel } from '@redux-saga/core';
import createUrlListener from 'libs/webext/createUrlListener';
import { createErrorAction } from 'libs/store/actions/helpers';

function* watchUrlsSaga() {
  const channel = yield call(() => eventChannel(createUrlListener));

  while (true) {
    try {
      yield put(yield take(channel));
    } catch (e) {
      yield put(createErrorAction()(e));
    }
  }
}

export default watchUrlsSaga;
