import { put, takeEvery } from 'redux-saga/effects';
import { AppAction, AppActionWithMeta } from 'libs/store/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import sendMessageToBackground from 'libs/webext/sendMessageToBackground';
import { Level } from 'libs/utils/Logger';

const shouldBeSentToBackground = (action: AppActionWithMeta): boolean =>
  action.meta && action.meta.sendToBackground
    ? action.meta.sendToBackground
    : false;

function* sendMessageToBackgroundSaga(action: AppAction) {
  try {
    yield sendMessageToBackground(action);
  } catch (e) {
    yield put(createErrorAction()(e, { severity: Level.ERROR }));
  }
}

export default function* sendActionsToBackgroundSaga() {
  yield takeEvery(shouldBeSentToBackground, sendMessageToBackgroundSaga);
}
