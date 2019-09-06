import { eventChannel } from '@redux-saga/core';
import { put, call, take } from 'redux-saga/effects';
import { createErrorAction } from 'app/actions';
import createExternalMessageListener from 'webext/createExternalMessageListener';

const createExternalMessageChannel = () =>
  eventChannel(createExternalMessageListener);

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
