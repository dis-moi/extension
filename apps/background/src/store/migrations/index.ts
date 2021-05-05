import {
  createMigrate as reduxPersistCreateMigrate,
  MigrationManifest,
  MigrationConfig,
  PersistedState,
  getStoredState,
  purgeStoredState
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { migration1 } from './1.2017-01-26';
import { migration2 } from './2.2019-02-11';
import { migration3 } from './3.2019-03';
import { migration4 } from './4.2019-08-28';
import { migration5 } from './5.2019-09-12';
import { persistConfig } from '../index';

const migrations: MigrationManifest = {
  1: migration1, // 26-01-2017
  2: migration2, // 2019-02-11
  3: migration3, // March 2019 - Typescript migration
  4: migration4, // August 2019 - rename readNotices to markedReadNotices
  5: migration5 // Septembre 2019 - rename markedReadNotices back to readNotices
};

export const isStateEmpty = (state: unknown) => {
  return !state;
};

export const createMigrate = (
  migrations: MigrationManifest,
  config: MigrationConfig
) => {
  return async (state: PersistedState, currentVersion: number) => {
    // if the sync storage is empty, let's try to restore a previous state from the local storage
    if (isStateEmpty(state)) {
      const localStoragePersistConfig = {
        ...persistConfig,
        storage
      };

      state = await getStoredState(localStoragePersistConfig);
      purgeStoredState(localStoragePersistConfig);
    }

    return reduxPersistCreateMigrate(migrations, config)(state, currentVersion);
  };
};

export const migrate = createMigrate(migrations, {
  debug: process.env.NODE_ENV !== 'production'
});

export default migrate;
