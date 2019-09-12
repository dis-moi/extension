import { put, select, takeLatest } from 'redux-saga/effects';
import { CloseCause } from 'app/lmem/ui';
import {
  toggleUI,
  showBullesUpdateMessage,
  BROWSER_ACTION_CLICKED,
  BrowserActionClickedAction
} from 'app/actions';
import { areTosAccepted } from '../selectors/prefs';

export function* browserActionClickedSaga(action: BrowserActionClickedAction) {
  const tosAccepted = yield select(areTosAccepted);

  if (tosAccepted) {
    yield put(toggleUI(action.payload.tab, CloseCause.BrowserAction));
  } else {
    yield put(showBullesUpdateMessage(action.payload.tab));
  }
}

export default function* backgroundRootSaga() {
  yield takeLatest(BROWSER_ACTION_CLICKED, browserActionClickedSaga);
}
