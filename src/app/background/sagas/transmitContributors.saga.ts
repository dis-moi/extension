/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { takeEvery, select } from 'redux-saga/effects';
import Tab from 'app/lmem/tab';
import {
  contributorsTransmitted,
  isTabReadyAction,
  ListeningActionsReadyAction
} from 'app/actions';
import sendToTab from 'webext/sendActionToTab';
import assocTabIfNotGiven from 'webext/assocTabIfNotGiven';
import { getContributorsWithSubscriptionState } from '../selectors/subscriptions.selectors';
import { SUBSCRIBE, UNSUBSCRIBE } from '../../constants/ActionTypes';
import { getTabsList } from '../selectors/tabs';

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
  for (const tab of yield select(getTabsList)) {
    yield sendContributorsToTab(tab);
  }
}

export default function* transmitContributorsSaga() {
  yield takeEvery(isTabReadyAction, sendContributorsBackToTab);
  yield takeEvery([SUBSCRIBE, UNSUBSCRIBE], subscribeSaga);
}
