import { takeLatest, call, put, select } from 'redux-saga/effects';
import Tab from 'app/lmem/tab';
import openOptions, { getOptionsUrl } from 'webext/openOptionsTab';
import {
  OPTIONS_REQUESTED,
  optionsTabOpened,
  optionsTabOpenFailed,
  OptionsRequestedAction
} from 'app/actions';
import { getOptionsTab } from '../selectors/tabs';

function* openOptionsSaga({ payload: pathname }: OptionsRequestedAction) {
  try {
    let tab = yield select(getOptionsTab);
    const url = getOptionsUrl(pathname);
    if (tab) {
      const { index } = yield call(browser.tabs.get, tab.id);
      yield call(browser.tabs.highlight, {
        windowId: tab.windowId,
        tabs: [index]
      });
      if (url !== tab.url) {
        yield call(chrome.tabs.update, tab.id, {
          url
        });
      }
    } else {
      tab = yield call(openOptions, pathname);
    }

    if (tab && tab.id) {
      yield put(optionsTabOpened({ ...(tab as Tab), url }));
    }
  } catch (error) {
    yield put(optionsTabOpenFailed(error));
  }
}

export default function* optionsRootSaga() {
  yield takeLatest(OPTIONS_REQUESTED, openOptionsSaga);
}
