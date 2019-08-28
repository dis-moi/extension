import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import Tab from 'app/lmem/Tab';
import openSettings from 'webext/openSettingsTab';
import sendToTab from 'webext/sendActionToTab';
import assocTabIfNotGiven from 'webext/assocTabIfNotGiven';
import {
  AppAction,
  contributorsTransmitted,
  ListeningActionsReadyAction,
  settingsTabOpened,
  settingsTabOpenFailed
} from '../../actions';
import { getContributors } from '../selectors/resources';

const isSettingsTabReadyAction = (action: AppAction): boolean =>
  action.type === 'LISTENING_ACTIONS_READY' &&
  action.meta.from === 'settings' &&
  !!action.meta.tab;

function* openSettingsSaga() {
  try {
    const tab: chrome.tabs.Tab = yield call(openSettings);
    if (tab && tab.id) {
      yield put(settingsTabOpened(tab as Tab));
    }
  } catch (error) {
    yield put(settingsTabOpenFailed(error));
  }
}

function* sendContributorsToSettingsTab(action: ListeningActionsReadyAction) {
  const tab = action.meta.tab as chrome.tabs.Tab & Tab;
  const contributors = yield select(getContributors);
  const contributorsTransmittedAction = assocTabIfNotGiven(tab)(
    contributorsTransmitted(contributors)
  );
  sendToTab(tab.id, contributorsTransmittedAction);
}

export default function* settings() {
  yield takeLatest('SETTINGS_REQUESTED', openSettingsSaga);
  yield takeEvery(isSettingsTabReadyAction, sendContributorsToSettingsTab);
}
