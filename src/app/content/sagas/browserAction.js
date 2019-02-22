import { put, takeLatest } from 'redux-saga/effects';
import { BROWSER_ACTION_CLICKED } from '../../constants/browser/action';
import { open } from '../actions/ui';

export function* browserActionClickedSaga() {
  yield put(open());
}

export default function* backgroundRootSaga() {
  yield takeLatest(BROWSER_ACTION_CLICKED, browserActionClickedSaga);
}
