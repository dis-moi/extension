import { call, put, take } from '@redux-saga/core/effects';
import { eventChannel } from '@redux-saga/core';
import createUrlListener from 'libs/webext/createUrlListener';
import { createErrorAction } from '../../../../../../libs/store/actions/helpers';
import { Level } from '../../../../../../libs/utils/Logger';

function* watchUrlsSaga() {
  const channel = yield call(() => eventChannel(createUrlListener));

  while (true) {
    try {
      yield put(yield take(channel));
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.ERROR }));
    }
  }
}

export default watchUrlsSaga;
