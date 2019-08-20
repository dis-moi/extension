import { put, select, takeLatest } from 'redux-saga/effects';
import { CloseCause } from 'app/lmem/ui';
import { BROWSER_ACTION_CLICKED } from 'app/constants/browser/action';
import { close, open } from 'app/actions/ui';
import { isOpen as isNotificationOpen } from '../selectors';

export function* browserActionClickedSaga() {
  const isOpen = yield select(isNotificationOpen);
  yield put(isOpen ? close(CloseCause.BrowserAction) : open());
}

export default function* backgroundRootSaga() {
  yield takeLatest(BROWSER_ACTION_CLICKED, browserActionClickedSaga);
}
