import { SagaIterator } from '@redux-saga/types';
import { ActionPattern, takeEvery, all, call } from '@redux-saga/core/effects';
import * as R from 'ramda';

import getSelectedTab from 'webext/getSelectedTab';
import postRating, { Rating } from 'api/postRating';
import { AppAction, FeedbackOnNoticeAction } from 'app/actions';
import { captureException } from 'app/utils/sentry';
import { RatingType } from 'app/lmem/rating';

export const isFeedBackRatingAction = (action: AppAction) =>
  action.type === 'FEEDBACK_ON_NOTICE' &&
  Object.values(RatingType).includes(action.payload.feedback);

type RatingActionTransformer = (action: AppAction) => Rating;

const createDefaultTransformer = (
  ratingType: RatingType
): RatingActionTransformer => ({ payload: id }: AppAction) => ({
  noticeId: id as number,
  rating: ratingType
});

export const transformers: {
  pattern: ActionPattern;
  transformer: RatingActionTransformer;
}[] = [
  {
    pattern: isFeedBackRatingAction,
    // eslint-disable-next-line
    // @ts-ignore
    transformer: ({ payload: { id, feedback } }: FeedbackOnNoticeAction) => ({
      noticeId: id,
      rating: feedback
    })
  },
  {
    pattern: 'NOTICE/UNFOLDED',
    transformer: createDefaultTransformer(RatingType.UNFOLD)
  },
  {
    pattern: 'NOTICE/BADGED',
    transformer: createDefaultTransformer(RatingType.BADGED)
  },
  {
    pattern: 'NOTICE/OUTBOUND_LINK_CLICKED',
    transformer: createDefaultTransformer(RatingType.OUTBOUND_CLICK)
  },
  {
    pattern: 'NOTICE/DISPLAYED',
    transformer: createDefaultTransformer(RatingType.DISPLAY)
  }
];

export const createPostRatingSaga = (transformer: RatingActionTransformer) =>
  function* postRatingSaga(action: AppAction): SagaIterator {
    try {
      let rating = transformer(action);
      if (!rating.url) {
        const selectedTab = yield call(getSelectedTab);
        rating = R.assoc('url', selectedTab.url, rating);
      }

      yield call(postRating, rating);
    } catch (e) {
      captureException(e);
    }
  };

export default function* ratingsRootSaga() {
  yield all(
    transformers.map(({ pattern, transformer }) =>
      takeEvery(pattern, createPostRatingSaga(transformer))
    )
  );
}
