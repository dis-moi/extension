import { select, take } from '@redux-saga/core/effects';
import { REHYDRATE } from 'redux-persist/es/constants';
import { isRehydrated } from '../../selectors';
import Logger from '../../../utils/Logger';

function* awaitRehydrationSaga() {
  Logger.debug('Checking store rehydratation ...');
  const rehydrated = yield select(isRehydrated);
  Logger.debug(`Store is ${rehydrated ? '' : 'not '}rehydrated!`);
  if (!rehydrated) {
    Logger.debug('Waiting for store rehydratation ...');
    yield take(REHYDRATE);
  }
  Logger.info('Store rehydrated check done');
}

export default awaitRehydrationSaga;
