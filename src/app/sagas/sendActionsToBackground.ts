import { takeEvery } from 'redux-saga/effects';
import { AppAction } from 'app/actions';
import sendMessageToBackground from 'webext/sendMessageToBackground';

const shouldBeSentToBackground = (action: AppAction): boolean =>
  action.meta && action.meta.sendToBackground
    ? action.meta.sendToBackground
    : false;

function* sendActionsToBackgroundSaga() {
  yield takeEvery(shouldBeSentToBackground, sendMessageToBackground);
}

export default sendActionsToBackgroundSaga;
