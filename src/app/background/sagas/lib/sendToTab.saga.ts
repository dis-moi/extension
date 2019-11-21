import { SagaIterator } from 'redux-saga';
import { delay, call, put } from 'redux-saga/effects';
import { AppAction, tabDied } from 'app/actions';
import Tab from 'app/lmem/tab';
import Logger from 'app/utils/Logger';
import sendToTab from 'webext/sendActionToTab';
import isAuthorizedTab from 'webext/isAuthorizedTab';
import { captureException } from 'app/utils/sentry';

const MAX_RETRIES = 5;

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
    if (remainingRetries > 1) {
      Logger.debug(
        `Could not communicate with tab ${tab.id} because ${error.message}, will retry ...`,
        error
      );
      yield delay(200);
      yield call(trySendToTab, tab, action, remainingRetries - 1);
    } else {
      yield put(tabDied(tab));
      captureException(
        error,
        `Could not communicate with tab ${tab.id} (${tab.url}) after ${MAX_RETRIES} attempts : ${error.message}`
      );
    }
  }
}

function* sendToTabSaga(tab: Tab, action: AppAction) {
  if (!isAuthorizedTab(tab)) return;

  yield trySendToTab(tab, action, MAX_RETRIES);
}

export default sendToTabSaga;
