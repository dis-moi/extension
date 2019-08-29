import { createMigrate } from 'redux-persist';
import { MigrationManifest } from 'redux-persist/es/types';
import { migration1 } from './1.2017-01-26';
import { migration2 } from './2.2019-02-11';
import { migration3 } from './3.2019-03';
import { migration4 } from './4.2019-08-28';

const migrations: MigrationManifest = {
  1: migration1, // 26-01-2017
  2: migration2, // 2019-02-11
  3: migration3, // March 2019 - Typescript migration
  4: migration4 // August 2019 - rename readNotices to markedReadNotices
};

export const migrate = createMigrate(migrations, {
  debug: process.env.NODE_ENV !== 'production'
});

export default migrate;
