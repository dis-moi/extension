import { take, call, put, takeEvery } from 'redux-saga/effects';
import {
  listeningActionsReady,
  NAVIGATED_TO_URL,
  TAB_REMOVED,
  TOGGLE_UI
} from 'app/actions';
import { CLOSED, NOTICES_FOUND, OPENED } from '../../constants/ActionTypes';

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
