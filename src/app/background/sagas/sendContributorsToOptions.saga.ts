/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { takeEvery, select } from 'redux-saga/effects';
import Tab from 'app/lmem/Tab';
import sendToTab from 'webext/sendActionToTab';
import assocTabIfNotGiven from 'webext/assocTabIfNotGiven';
import {
  AppAction,
  contributorsTransmitted,
  ListeningActionsReadyAction
} from '../../actions';
import { getContributorsWithSubscriptionState } from '../selectors/subscriptions.selectors';
import { SUBSCRIBE, UNSUBSCRIBE } from '../../constants/ActionTypes';
import { getOptionsTab } from '../selectors/tabs';

export const isOptionsTabReadyAction = (action: AppAction): boolean =>
  action.type === 'LISTENING_ACTIONS_READY' &&
  action.meta.from === 'options' &&
  !!action.meta.tab;

function* sendContributorsToTab(tab: chrome.tabs.Tab & Tab) {
  const contributors = yield select(getContributorsWithSubscriptionState);
  const contributorsTransmittedAction = assocTabIfNotGiven(tab)(
    contributorsTransmitted(contributors)
  );
  sendToTab(tab.id, contributorsTransmittedAction);
}

function* sendContributorsBackToTab(action: ListeningActionsReadyAction) {
  const tab = action.meta.tab as chrome.tabs.Tab & Tab;
  yield sendContributorsToTab(tab);
}

function* subscribeSaga() {
  const optionsTab = yield select(getOptionsTab);
  if (optionsTab) {
    yield sendContributorsToTab(optionsTab);
  }
}

export default function* sendContributorsToOptionsSaga() {
  yield takeEvery(isOptionsTabReadyAction, sendContributorsBackToTab);
  yield takeEvery([SUBSCRIBE, UNSUBSCRIBE], subscribeSaga);
}
