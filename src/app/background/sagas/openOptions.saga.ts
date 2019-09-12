import { takeLatest, call, put } from 'redux-saga/effects';
import Tab from 'app/lmem/tab';
import openOptions from 'webext/openOptionsTab';
import {
  OPTIONS_REQUESTED,
  optionsTabOpened,
  optionsTabOpenFailed,
  OptionsRequestedAction
} from 'app/actions';

function* openOptionsSaga({ payload: pathname }: OptionsRequestedAction) {
  try {
    const tab: chrome.tabs.Tab = yield call(openOptions, pathname);
    if (tab && tab.id) {
      yield put(optionsTabOpened(tab as Tab));
    }
  } catch (error) {
    yield put(optionsTabOpenFailed(error));
  }
}

export default function* openOptionsWhenRequestedSaga() {
  yield takeLatest(OPTIONS_REQUESTED, openOptionsSaga);
}
