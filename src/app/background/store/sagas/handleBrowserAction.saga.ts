import { put, takeLatest } from 'redux-saga/effects';
import { CloseCause } from 'libs/domain/ui';
import {
  ACTION_CLICKED,
  toggleUI,
  BrowserActionClickedAction
} from 'libs/store/actions';

export function* browserActionClickedSaga({
  meta: { tab }
}: BrowserActionClickedAction) {
  yield put(toggleUI(tab, CloseCause.BrowserAction));
}

export default function* backgroundRootSaga() {
  yield takeLatest(ACTION_CLICKED, browserActionClickedSaga);
}
