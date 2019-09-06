import { takeLatest, call, put } from 'redux-saga/effects';
import Tab from 'app/lmem/Tab';
import openOptions from 'webext/openOptionsTab';
import { optionsTabOpened, optionsTabOpenFailed } from '../../actions';

function* openOptionsSaga() {
  try {
    const tab: chrome.tabs.Tab = yield call(openOptions);
    if (tab && tab.id) {
      yield put(optionsTabOpened(tab as Tab));
    }
  } catch (error) {
    yield put(optionsTabOpenFailed(error));
  }
}

export default function* openOptionsWhenRequestedSaga() {
  yield takeLatest('OPTIONS_REQUESTED', openOptionsSaga);
}
