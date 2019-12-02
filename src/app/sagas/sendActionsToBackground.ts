import { takeEvery, put } from 'redux-saga/effects';
import { AppAction, createErrorAction } from 'app/actions';
import sendMessageToBackground from 'webext/sendMessageToBackground';

const shouldBeSentToBackground = (action: AppAction): boolean =>
  action.meta && action.meta.sendToBackground
    ? action.meta.sendToBackground
    : false;

function* sendMessageToBackgroundSaga(action: AppAction) {
  try {
    sendMessageToBackground(action);
  } catch (e) {
    yield put(createErrorAction()(e));
  }
}

export default function* sendActionsToBackgroundSaga() {
  yield takeEvery(shouldBeSentToBackground, sendMessageToBackgroundSaga);
}
