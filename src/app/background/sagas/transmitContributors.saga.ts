/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { takeEvery, select, fork } from 'redux-saga/effects';
import Tab from 'app/lmem/tab';
import {
  contributorsTransmitted,
  isTabReadyAction,
  ListeningActionsReadyAction
} from 'app/actions';
import assocTabIfNotGiven from 'webext/assocTabIfNotGiven';
import { getContributorsWithSubscriptionState } from '../selectors/subscriptions.selectors';
import { SUBSCRIBE, UNSUBSCRIBE } from '../../constants/ActionTypes';
import { getTabsList } from '../selectors/tabs';
import sendToTabSaga from './lib/sendToTab.saga';

function* sendContributorsToTab(tab: chrome.tabs.Tab & Tab) {
  const contributors = yield select(getContributorsWithSubscriptionState);
  const contributorsTransmittedAction = assocTabIfNotGiven(tab)(
    contributorsTransmitted(contributors)
  );
  yield sendToTabSaga(tab, contributorsTransmittedAction);
}

function* sendContributorsBackToTab(action: ListeningActionsReadyAction) {
  const tab = action.meta.tab as chrome.tabs.Tab & Tab;
  yield sendContributorsToTab(tab);
}

function* subscribeSaga() {
  for (const tab of yield select(getTabsList)) {
    yield fork(sendContributorsToTab, tab);
  }
}

export default function* transmitContributorsSaga() {
  yield takeEvery(isTabReadyAction, sendContributorsBackToTab);
  yield takeEvery([SUBSCRIBE, UNSUBSCRIBE], subscribeSaga);
}
