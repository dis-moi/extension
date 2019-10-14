import { SagaIterator } from 'redux-saga';
import { delay, call } from 'redux-saga/effects';
import { AppAction } from 'app/actions';
import Tab from 'app/lmem/tab';
import Logger from 'app/utils/Logger';
import sendToTab from 'webext/sendActionToTab';
import isAuthorizedTab from 'webext/isAuthorizedTab';

const MAX_RETRIES = 100;

function* trySendToTab(
  tab: Tab,
  action: AppAction,
  remainingRetries: number
): SagaIterator {
  try {
    Logger.trace(`trying to send ${action.type} to ${tab.id}(${tab.url})`);
    yield call(sendToTab, tab.id, action);
    Logger.debug(`sent ${action.type} to ${tab.id}(${tab.url}) !`);
  } catch (error) {
    Logger.debug(
      `Could not communicate with tab ${tab.id} because ${error.message}, will retry ...`,
      error
    );
    yield delay(200);
    yield call(trySendToTab, tab, action, remainingRetries - 1);
  }
}

function* sendToTabSaga(tab: Tab, action: AppAction) {
  if (!isAuthorizedTab(tab)) return;

  yield trySendToTab(tab, action, MAX_RETRIES);
}

export default sendToTabSaga;
