import { getStoredState, persistStore } from 'redux-persist';
import reduxPersistTransform from '../lmem/reduxPersistTransform';
import storage from 'chrome-storage-local';

export default function (configure, callback) {
  const persistConfig = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local ? {
    storage,
    skipRestore: true,
    transforms: [reduxPersistTransform],
    debounce: 0
  } : {
    skipRestore: true
  };
  getStoredState(persistConfig, (err, initialState) => {
    const store = configure(initialState);
    persistStore(store, persistConfig, () => { callback(store); });
  });
}
