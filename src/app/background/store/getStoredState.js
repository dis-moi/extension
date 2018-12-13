import { getStoredState, persistStore } from 'redux-persist-immutable';
import storage from 'chrome-storage-local';
import reduxPersistTransform from './reduxPersistTransform';

export default function (configure, callback) {
  const persistConfig = Object.assign(
    {
      transforms: [reduxPersistTransform],
      whitelist: ['prefs'],
      debounce: 0
    },
    chrome !== 'undefined' && chrome.storage && chrome.storage.local
      ? { storage }
      : {}
  );
  getStoredState(persistConfig, (err, initialState) => {
    const store = configure(initialState);
    persistStore(store, persistConfig, () => { callback(store); });
  });
}
