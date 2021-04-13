import { fork, all } from 'redux-saga/effects';
import contributorSaga from './contributor.saga';
import locationChangeSaga from './locationChange.saga';
import contributorsSaga from 'app/profiles/store/sagas/contributors.saga';
import noticesSaga from 'app/profiles/store/sagas/notices.saga';
import portConnectionSaga from 'app/profiles/store/sagas/portConnection.saga';
import windowConnectionSaga from 'app/profiles/store/sagas/windowConnection.saga';
import subscriptionsSaga from 'app/profiles/store/sagas/subscriptions.saga';
import categoriesSaga from 'app/profiles/store/sagas/categories.saga';

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
