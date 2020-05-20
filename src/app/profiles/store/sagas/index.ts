import { fork, all, put } from 'redux-saga/effects';
import contributorsSaga from 'app/profiles/store/sagas/contributors.saga';
import matchingContextsSaga from 'app/profiles/store/sagas/matchingContexts.saga';
import noticesSaga from 'app/profiles/store/sagas/notices.saga';
import connectionSaga from 'app/profiles/store/sagas/connection.saga';
import subscriptionsSaga from 'app/profiles/store/sagas/subscriptions.saga';
import { refreshContributors, refreshMatchingContexts } from 'app/actions';

export default function* rootSaga() {
  yield all([
    fork(contributorsSaga),
    fork(matchingContextsSaga),
    fork(noticesSaga),
    fork(connectionSaga),
    fork(subscriptionsSaga)
  ]);

  yield put(refreshMatchingContexts());
  yield put(refreshContributors());
}
