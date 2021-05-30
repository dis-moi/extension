import { put, takeLatest } from 'redux-saga/effects';
import { CloseCause } from 'app/lmem/ui';
import {
  BROWSER_ACTION_CLICKED,
  toggleUI,
  BrowserActionClickedAction
} from 'libs/store/actions';

export function* browserActionClickedSaga({
  meta: { tab }
}: BrowserActionClickedAction) {
  yield put(toggleUI(tab, CloseCause.BrowserAction));
}

export default function* backgroundRootSaga() {
  yield takeLatest(BROWSER_ACTION_CLICKED, browserActionClickedSaga);
}
