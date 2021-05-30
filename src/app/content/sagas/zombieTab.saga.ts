import { take, call, put, takeEvery } from 'redux-saga/effects';
import {
  CLOSED,
  NAVIGATED_TO_URL,
  NOTICES_FOUND,
  OPENED,
  TAB_REMOVED,
  TOGGLE_UI,
  listeningActionsReady
} from 'libs/store/actions';

function* sendListeningBackToBackgroundSaga() {
  yield put(listeningActionsReady('content', { sendToBackground: true }));
}

function* sendListeningBackToBackgroundIfStillAliveSaga() {
  yield take([CLOSED, OPENED, NOTICES_FOUND, TOGGLE_UI, NAVIGATED_TO_URL]);
  yield call(sendListeningBackToBackgroundSaga);
}

export default function* zombieTabSaga() {
  yield takeEvery(TAB_REMOVED, sendListeningBackToBackgroundIfStillAliveSaga);
}
