import { WebStorage } from 'redux-persist/es/types';

export type BrowserStorageType = 'sync' | 'local';

export default (type: BrowserStorageType): WebStorage => {
  const storage = browser.storage[type];
  return {
    getItem: (key: string) => storage.get(key).then(value => value[key]),
    setItem: (key: string, item: string) =>
      storage.set({ [key]: item }).then(() => item),
    removeItem: (key: string) => storage.remove(key)
  };
};
