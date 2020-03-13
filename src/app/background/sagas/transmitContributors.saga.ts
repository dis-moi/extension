/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { takeEvery, select, fork } from 'redux-saga/effects';
import Tab from 'app/lmem/tab';
import {
  contributorsTransmitted,
  isTabReadyAction,
  SUBSCRIBE,
  UNSUBSCRIBE,
  UPDATE_CONTRIBUTORS,
  ListeningActionsReadyAction
} from 'app/actions';
import assocMetaIfNotGiven from 'webext/assocMetaIfNotGiven';
import { getContributorsWithSubscriptionState } from '../selectors/subscriptions.selectors';
import { getTabsList } from '../selectors/tabs';
import sendToTabSaga from './lib/sendToTab.saga';

function* sendContributorsToTab(tab: chrome.tabs.Tab & Tab) {
  const contributors = yield select(getContributorsWithSubscriptionState);
  const contributorsTransmittedAction = assocMetaIfNotGiven(
    'tab',
    tab
  )(contributorsTransmitted(contributors));
  yield sendToTabSaga(tab, contributorsTransmittedAction);
}

function* sendContributorsBackToTab(action: ListeningActionsReadyAction) {
  const tab = action.meta.tab as chrome.tabs.Tab & Tab;
  yield sendContributorsToTab(tab);
}

function* updateContributorsInTabs() {
  for (const tab of yield select(getTabsList)) {
    yield fork(sendContributorsToTab, tab);
  }
}

export default function* transmitContributorsSaga() {
  yield takeEvery(isTabReadyAction, sendContributorsBackToTab);
  yield takeEvery(
    [SUBSCRIBE, UNSUBSCRIBE, UPDATE_CONTRIBUTORS],
    updateContributorsInTabs
  );
}
