import { put, select, takeLatest, call } from 'redux-saga/effects';
import { CloseCause } from 'app/lmem/ui';
import {
  BROWSER_ACTION_CLICKED,
  toggleUI,
  BrowserActionClickedAction
} from 'app/actions';
import { areTosAccepted } from '../selectors/prefs';
import { getNbSubscriptions } from '../selectors/subscriptions.selectors';
import serviceMessageSaga from './serviceMessageSaga';

export function* browserActionClickedSaga(action: BrowserActionClickedAction) {
  const tosAccepted = yield select(areTosAccepted);
  const nbSubscriptions = yield select(getNbSubscriptions);

  if (tosAccepted && nbSubscriptions > 0) {
    yield put(toggleUI(action.payload.tab, CloseCause.BrowserAction));
  } else {
    yield call(serviceMessageSaga, action);
  }
}

export default function* backgroundRootSaga() {
  yield takeLatest(BROWSER_ACTION_CLICKED, browserActionClickedSaga);
}
