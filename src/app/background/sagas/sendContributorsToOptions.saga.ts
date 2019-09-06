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

const isOptionsTabReadyAction = (action: AppAction): boolean =>
  action.type === 'LISTENING_ACTIONS_READY' &&
  action.meta.from === 'options' &&
  !!action.meta.tab;

function* sendContributorsToOptionsTab(action: ListeningActionsReadyAction) {
  const tab = action.meta.tab as chrome.tabs.Tab & Tab;
  const contributors = yield select(getContributorsWithSubscriptionState);
  const contributorsTransmittedAction = assocTabIfNotGiven(tab)(
    contributorsTransmitted(contributors)
  );
  sendToTab(tab.id, contributorsTransmittedAction);
}

export default function* sendContributorsToOptionsSaga() {
  yield takeEvery(isOptionsTabReadyAction, sendContributorsToOptionsTab);
  yield takeEvery([SUBSCRIBE, UNSUBSCRIBE], sendContributorsToOptionsTab);
}
