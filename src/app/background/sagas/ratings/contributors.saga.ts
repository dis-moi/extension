import { SagaIterator } from '@redux-saga/types';
import { call, takeEvery } from '@redux-saga/core/effects';
import { ContributorAction } from 'app/actions';
import { captureException } from 'app/utils/sentry';
import ContributorRatingType from 'app/lmem/ContributorRatingType';
import postContributorRating from 'api/postContributorRating';
import { getContributorId } from 'app/background/reducers/subscriptions.reducer';
import { SUBSCRIBE, UNSUBSCRIBE } from 'app/constants/ActionTypes';

const postContributorFeedback = (ratingType: ContributorRatingType) =>
  function* contributorRatingSaga(action: ContributorAction): SagaIterator {
    try {
      if (ratingType) {
        yield call(postContributorRating, {
          contributorId: getContributorId(action),
          ratingType
        });
      } else {
        throw new Error(
          `Contributor rating saga caught an action (${action.type}) with no ratings, this is not supposed to happen.`
        );
      }
    } catch (e) {
      captureException(e);
    }
  };

export default function* contributorRatingsRootSaga() {
  yield takeEvery(
    SUBSCRIBE,
    postContributorFeedback(ContributorRatingType.SUBSCRIBE)
  );
  yield takeEvery(
    UNSUBSCRIBE,
    postContributorFeedback(ContributorRatingType.UNSUBSCRIBE)
  );
}
