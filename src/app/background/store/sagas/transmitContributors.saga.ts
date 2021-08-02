/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { takeEvery, select, fork } from 'redux-saga/effects';
import Tab from 'libs/domain/tab';
import {
  contributorsTransmitted,
  isTabReadyAction,
  SUBSCRIBE,
  UNSUBSCRIBE,
  UPDATE_CONTRIBUTORS,
  ListeningActionsReadyAction
} from 'libs/store/actions';
import assocMetaIfNotGiven from 'libs/webext/assocMetaIfNotGiven';
import { getContributorsWithSubscriptionState } from 'app/background/store/selectors/subscriptions.selectors';
import { getTabsList } from 'app/background/store/selectors/tabs';
import sendToTabSaga from './lib/sendToTab.saga';

function* sendContributorsToTab(tab: browser.tabs.Tab & Tab) {
  const contributors = yield select(getContributorsWithSubscriptionState);
  const contributorsTransmittedAction = assocMetaIfNotGiven(
    'tab',
    tab
  )(contributorsTransmitted(contributors));
  yield sendToTabSaga(tab, contributorsTransmittedAction);
}

function* sendContributorsBackToTab(action: ListeningActionsReadyAction) {
  const tab = action.meta.tab as browser.tabs.Tab & Tab;
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
