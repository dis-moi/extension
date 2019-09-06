import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import Tab from 'app/lmem/Tab';
import openOptions from 'webext/openOptionsTab';
import sendToTab from 'webext/sendActionToTab';
import assocTabIfNotGiven from 'webext/assocTabIfNotGiven';
import {
  AppAction,
  contributorsTransmitted,
  ListeningActionsReadyAction,
  optionsTabOpened,
  optionsTabOpenFailed
} from '../../actions';
import { getContributors } from '../selectors/resources';

const isOptionsTabReadyAction = (action: AppAction): boolean =>
  action.type === 'LISTENING_ACTIONS_READY' &&
  action.meta.from === 'options' &&
  !!action.meta.tab;

function* openOptionsSaga() {
  try {
    const tab: chrome.tabs.Tab = yield call(openOptions);
    if (tab && tab.id) {
      yield put(optionsTabOpened(tab as Tab));
    }
  } catch (error) {
    yield put(optionsTabOpenFailed(error));
  }
}

function* sendContributorsToOptionsTab(action: ListeningActionsReadyAction) {
  const tab = action.meta.tab as chrome.tabs.Tab & Tab;
  const contributors = yield select(getContributors);
  const contributorsTransmittedAction = assocTabIfNotGiven(tab)(
    contributorsTransmitted(contributors)
  );
  sendToTab(tab.id, contributorsTransmittedAction);
}

export default function* options() {
  yield takeLatest('OPTIONS_REQUESTED', openOptionsSaga);
  yield takeEvery(isOptionsTabReadyAction, sendContributorsToOptionsTab);
}
