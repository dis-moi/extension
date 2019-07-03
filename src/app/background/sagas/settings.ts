import { takeLatest } from 'redux-saga/effects';

const openSettings = () =>
  chrome.tabs.create({
    url: chrome.extension.getURL('settings.html')
  });

export default function* settings() {
  yield takeLatest('SETTINGS_REQUESTED', openSettings);
}
