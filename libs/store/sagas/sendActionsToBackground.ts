import { put, takeEvery } from 'redux-saga/effects';
import { AppAction } from 'libs/store/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import sendMessageToBackground from '../../webext/sendMessageToBackground';
import { Level } from '../../utils/Logger';

const shouldBeSentToBackground = (action: AppAction): boolean =>
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
