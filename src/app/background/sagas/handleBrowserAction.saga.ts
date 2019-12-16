import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CloseCause } from 'app/lmem/ui';
import {
  BROWSER_ACTION_CLICKED,
  toggleUI,
  BrowserActionClickedAction
} from 'app/actions';
import { areTosAccepted } from '../selectors/prefs';
import { getNbSubscriptions } from '../selectors/subscriptions.selectors';
import serviceMessageSaga from './serviceMessage.saga';
import { getNumberOfUnreadNoticesOnTab } from '../selectors';

export function* browserActionClickedSaga({
  meta: { tab }
}: BrowserActionClickedAction) {
  const tosAccepted = yield select(areTosAccepted);
  const nbSubscriptions = yield select(getNbSubscriptions);
  const nbNotices = yield select(getNumberOfUnreadNoticesOnTab(tab.id));

  if (tosAccepted && nbSubscriptions > 0) {
    yield put(toggleUI(tab, CloseCause.BrowserAction));
  } else {
    yield call(serviceMessageSaga, tab, nbNotices);
  }
}

export default function* backgroundRootSaga() {
  yield takeLatest(BROWSER_ACTION_CLICKED, browserActionClickedSaga);
}
