import { put, takeLatest, select } from "redux-saga/effects";
import { BROWSER_ACTION_CLICKED } from "../../constants/browser/action";
import { open, close } from "app/actions/ui";
import { isOpen as isNotificationOpen } from "../selectors";

export function* browserActionClickedSaga() {
  const isOpen = yield select(isNotificationOpen);
  yield put(isOpen ? close() : open());
}

export default function* backgroundRootSaga() {
  yield takeLatest(BROWSER_ACTION_CLICKED, browserActionClickedSaga);
}
