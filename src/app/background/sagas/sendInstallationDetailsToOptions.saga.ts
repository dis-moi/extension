/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { takeEvery, select } from 'redux-saga/effects';
import Tab from 'app/lmem/Tab';
import {
  AppAction,
  ListeningActionsReadyAction,
  updateInstallationDetails,
  TosAcceptedAction,
  transmitTosStatus
} from 'app/actions';
import sendToTab from 'webext/sendActionToTab';
import assocTabIfNotGiven from 'webext/assocTabIfNotGiven';
import { getInstallationDetails } from '../selectors/installationDetails';
import { areTosAccepted } from '../selectors/prefs';

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
  sendToTab(tab.id, transmitAction);
}

function* sendInstallationDetailsToOptionsTab(
  action: ListeningActionsReadyAction
) {
  const tab = action.meta.tab as chrome.tabs.Tab & Tab;
  const installationDetails = yield select(getInstallationDetails);
  const transmitAction = assocTabIfNotGiven(tab)(
    updateInstallationDetails(installationDetails)
  );
  sendToTab(tab.id, transmitAction);

  yield sendTosStateToOptionsTab(action);
}

export default function* sendInstallationDetailsToOptionsSaga() {
  yield takeEvery(isOptionsTabReadyAction, sendInstallationDetailsToOptionsTab);
  yield takeEvery('TOS_ACCEPTED', sendTosStateToOptionsTab);
}
