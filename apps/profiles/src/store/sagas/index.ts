import { fork, all } from 'redux-saga/effects';
import contributorSaga from './contributor.saga';
import contributorsSaga from 'apps/profiles/src/store/sagas/contributors.saga';
import locationChangeSaga from './locationChange.saga';
import noticesSaga from 'apps/profiles/src/store/sagas/notices.saga';
import portConnectionSaga from 'apps/profiles/src/store/sagas/portConnection.saga';
import windowConnectionSaga from 'apps/profiles/src/store/sagas/windowConnection.saga';
import subscriptionsSaga from 'apps/profiles/src/store/sagas/subscriptions.saga';
import categoriesSaga from 'apps/profiles/src/store/sagas/categories.saga';

const connectionSaga = browser?.runtime?.connect
  ? portConnectionSaga
  : windowConnectionSaga.bind(null, process.env.PROFILES_ORIGIN);

export default function* rootSaga() {
  yield all([
    fork(connectionSaga),
    fork(contributorSaga),
    fork(contributorsSaga),
    fork(locationChangeSaga),
    fork(noticesSaga),
    fork(subscriptionsSaga),
    fork(categoriesSaga)
  ]);
}
