/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';
import Tab from 'app/lmem/tab';
import openOptions from 'webext/openOptionsTab';
import assocMetaIfNotGiven from 'webext/assocMetaIfNotGiven';
import {
  OPTIONS_REQUESTED,
  optionsTabOpened,
  optionsTabOpenFailed,
  OptionsRequestedAction,
  updateInstallationDetails,
  transmitTosStatus,
  TOS_ACCEPTED,
  LISTENING_ACTIONS_READY,
  AppAction,
  ListeningActionsReadyAction,
  TosAcceptedAction,
  refreshContributors
} from 'app/actions';
import { getInstallationDetails } from '../selectors/installationDetails';
import { areTosAccepted } from '../selectors/prefs';
import sendToTabSaga from './lib/sendToTab.saga';

const isOptionsTabReadyAction = (action: AppAction): boolean =>
  action.type === LISTENING_ACTIONS_READY &&
  action.meta.from === 'options' &&
  !!action.meta.tab;

function* openOptionsSaga({ payload: pathname }: OptionsRequestedAction) {
  try {
    const tab: browser.tabs.Tab = yield call(openOptions, pathname);
    if (tab && tab.id) {
      yield put(optionsTabOpened(tab as Tab));
    }
  } catch (error) {
    yield put(optionsTabOpenFailed(error));
  }
}

function* sendTosStateToOptionsTab(
  action: ListeningActionsReadyAction | TosAcceptedAction
) {
  const tab = action.meta!.tab as browser.tabs.Tab & Tab;
  const transmitAction = assocMetaIfNotGiven(
    'tab',
    tab
  )(transmitTosStatus(yield select(areTosAccepted)));
  yield sendToTabSaga(tab, transmitAction);
}

function* optionsTabReadySaga(action: ListeningActionsReadyAction) {
  yield put(refreshContributors());

  const tab = action.meta.tab as browser.tabs.Tab & Tab;
  const installationDetails = yield select(getInstallationDetails);
  const transmitAction = assocMetaIfNotGiven(
    'tab',
    tab
  )(updateInstallationDetails(installationDetails, { sendToTab: true }));
  yield sendToTabSaga(tab, transmitAction);
  yield sendTosStateToOptionsTab(action);
}

export default function* optionsRootSaga() {
  yield takeLatest(OPTIONS_REQUESTED, openOptionsSaga);
  yield takeEvery(TOS_ACCEPTED, sendTosStateToOptionsTab);
  yield takeEvery(isOptionsTabReadyAction, optionsTabReadySaga);
}
