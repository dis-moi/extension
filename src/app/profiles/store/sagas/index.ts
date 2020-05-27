import { fork, all } from 'redux-saga/effects';
import contributorSaga from './contributor.saga';
import contributorsSaga from 'app/profiles/store/sagas/contributors.saga';
import locationChangeSaga from './locationChange.saga';
import matchingContextsSaga from 'app/profiles/store/sagas/matchingContexts.saga';
import noticesSaga from 'app/profiles/store/sagas/notices.saga';
import connectionSaga from 'app/profiles/store/sagas/connection.saga';
import subscriptionsSaga from 'app/profiles/store/sagas/subscriptions.saga';

export default function* rootSaga() {
  yield all([
    fork(contributorSaga),
    fork(contributorsSaga),
    fork(locationChangeSaga),
    fork(matchingContextsSaga),
    fork(noticesSaga),
    fork(connectionSaga),
    fork(subscriptionsSaga)
  ]);
}
