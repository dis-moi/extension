import { put, select, takeLatest } from 'redux-saga/effects';
import { CloseCause } from 'app/lmem/ui';
import {
  switchUI,
  BrowserActionClickedAction,
  showBullesUpdateMessage
} from 'app/actions';
import { BROWSER_ACTION_CLICKED } from 'app/constants/browser/action';
import { areTosAccepted } from '../selectors/prefs';

export function* browserActionClickedSaga(action: BrowserActionClickedAction) {
  const tosAccepted = yield select(areTosAccepted);

  if (tosAccepted) {
    yield put(switchUI(action.payload.tab, CloseCause.BrowserAction));
  } else {
    yield put(showBullesUpdateMessage(action.payload.tab));
  }
}

export default function* backgroundRootSaga() {
  yield takeLatest(BROWSER_ACTION_CLICKED, browserActionClickedSaga);
}
