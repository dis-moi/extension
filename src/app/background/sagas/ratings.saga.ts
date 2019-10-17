import { SagaIterator } from '@redux-saga/types';
import { ActionPattern, takeLatest, all, call } from '@redux-saga/core/effects';
import * as R from 'ramda';

import getSelectedTab from 'webext/getSelectedTab';
import postRating, { Rating } from 'api/postRating';
import {
  AppAction,
  FeedbackOnNoticeAction,
  NoticeDisplayedAction
} from 'app/actions';
import { captureException } from 'app/utils/sentry';
import { RatingType } from 'app/lmem/rating';

const isFeedBackRatingAction = (action: AppAction) =>
  action.type === 'FEEDBACK_ON_NOTICE' &&
  Object.values(RatingType).includes(action.payload.feedback);

export type RatingActionTransformer = (action: AppAction) => Rating;

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
    pattern: 'NOTICE_DISPLAYED',
    // eslint-disable-next-line
    // @ts-ignore
    transformer: ({ payload: { notice, url } }: NoticeDisplayedAction) => ({
      noticeId: notice.id,
      rating: RatingType.DISPLAY,
      url
    })
  },
  {
    pattern: ['UNFOLD_NOTICE', 'NOTICE_BADGED', 'NOTICE/OUTBOUND_LINK_CLICKED'],
    transformer: ({ payload: id }: AppAction) => ({
      noticeId: id as number,
      rating: RatingType.UNFOLD
    })
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
      takeLatest(pattern, createPostRatingSaga(transformer))
    )
  );
}
