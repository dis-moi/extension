/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { takeEvery, select } from 'redux-saga/effects';
import Tab from 'app/lmem/tab';
import {
  AppAction,
  ListeningActionsReadyAction,
  updateInstallationDetails,
  TosAcceptedAction,
  transmitTosStatus
} from 'app/actions';
import assocTabIfNotGiven from 'webext/assocTabIfNotGiven';
import { getInstallationDetails } from '../selectors/installationDetails';
import { areTosAccepted } from '../selectors/prefs';
import sendToTabSaga from './lib/sendToTab.saga';

const isOptionsTabReadyAction = (action: AppAction): boolean =>
  action.type === 'LISTENING_ACTIONS_READY' &&
  action.meta.from === 'options' &&
  !!action.meta.tab;

function* sendTosStateToOptionsTab(
  action: ListeningActionsReadyAction | TosAcceptedAction
) {
  const tab = action.meta!.tab as chrome.tabs.Tab & Tab;
  const transmitAction = assocTabIfNotGiven(tab)(
    transmitTosStatus(yield select(areTosAccepted))
  );
  yield sendToTabSaga(tab, transmitAction);
}

function* sendInstallationDetailsToOptionsTab(
  action: ListeningActionsReadyAction
) {
  const tab = action.meta.tab as chrome.tabs.Tab & Tab;
  const installationDetails = yield select(getInstallationDetails);
  const transmitAction = assocTabIfNotGiven(tab)(
    updateInstallationDetails(installationDetails)
  );
  yield sendToTabSaga(tab, transmitAction);
  yield sendTosStateToOptionsTab(action);
}

export default function* sendInstallationDetailsToOptionsSaga() {
  yield takeEvery(isOptionsTabReadyAction, sendInstallationDetailsToOptionsTab);
  yield takeEvery('TOS_ACCEPTED', sendTosStateToOptionsTab);
}
