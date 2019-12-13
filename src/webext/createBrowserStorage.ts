import { WebStorage } from 'redux-persist/es/types';

export type BrowserStorageType = 'sync' | 'local';

/**
 * MIT License
 * Copyright (c) 2018 Ross Allen
 * https://github.com/ssorallen/redux-persist-webextension-storage
 */
export default (type: BrowserStorageType): WebStorage => {
  const storage = chrome.storage[type];
  return {
    getItem: (key: string) => {
      return new Promise<string>((resolve, reject) => {
        storage.get(key, value => {
          if (chrome.runtime.lastError == null) {
            // Chrome Storage returns the value in an Object of with its original key. Unwrap the
            // value from the returned Object to match the `getItem` API.
            resolve(value[key]);
          } else {
            reject(new Error(chrome.runtime.lastError.message));
          }
        });
      });
    },

    setItem: (key: string, item: string) => {
      return new Promise<string>((resolve, reject) => {
        storage.set({ [key]: item }, () => {
          if (chrome.runtime.lastError == null) {
            resolve(item);
          } else {
            reject(new Error(chrome.runtime.lastError.message));
          }
        });
      });
    },

    removeItem: (key: string) => {
      return new Promise<void>((resolve, reject) => {
        storage.remove(key, () => {
          if (chrome.runtime.lastError == null) {
            resolve();
          } else {
            reject(new Error(chrome.runtime.lastError.message));
          }
        });
      });
    }
  };
};
