import { call, takeEvery } from 'redux-saga/effects';
import { AppAction } from 'app/actions';
import sendMessageToBackground from 'webext/sendMessageToBackground';

const shouldBeSentToBackground = (action: AppAction): boolean =>
  action.meta && action.meta.sendToBackground
    ? action.meta.sendToBackground
    : false;

function* sendToBackgroundSaga(action: AppAction) {
  const response = yield call(sendMessageToBackground, action);
  console.log('Background respond', response);
}

function* sendActionsToBackgroundSaga() {
  yield takeEvery(shouldBeSentToBackground, sendToBackgroundSaga);
}

export default sendActionsToBackgroundSaga;
