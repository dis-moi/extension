import { SagaIterator } from '@redux-saga/types';
import { takeEvery, call } from '@redux-saga/core/effects';
import * as R from 'ramda';

import { AppAction, ContributorAction } from 'app/actions';
import { captureException } from 'app/utils/sentry';
import ContributorRatingType from 'app/lmem/ContributorRatingType';
import postContributorRating from 'api/postContributorRating';
import { getContributorId } from 'app/background/reducers/subscriptions.reducer';

export const isContributorRatingTypeAction = (action: AppAction) =>
  R.hasPath(['payload', 'contributor'], action) &&
  R.hasPath(['meta', 'ratingType'], action) &&
  Object.values(ContributorRatingType).includes(
    R.path(['meta', 'ratingType'], action)
  );

export function* contributorRatingSaga(
  action: ContributorAction
): SagaIterator {
  try {
    const {
      meta: { ratingType }
    } = action;
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
}

export default function* contributorRatingsRootSaga() {
  yield takeEvery(isContributorRatingTypeAction, contributorRatingSaga);
}
