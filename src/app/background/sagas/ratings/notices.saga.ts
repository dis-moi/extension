import { SagaIterator } from 'redux-saga';
import { ActionPattern, all, call, takeEvery } from 'redux-saga/effects';
import postRating, { Rating } from 'api/postRating';
import {
  ActionMetaWithTab,
  AppAction,
  AppActionWithMeta,
  FEEDBACK_ON_NOTICE,
  NOTICE_BADGED,
  NOTICE_DISPLAYED,
  NOTICE_UNFOLDED,
  OUTBOUND_LINK_CLICKED,
  OutboundLinkClickedAction,
  ReceivedFeedbackOnNoticeAction
} from 'app/actions';
import { RatingType } from 'app/lmem/rating';

export const isFeedBackRatingAction = (action: AppAction) =>
  action.type === FEEDBACK_ON_NOTICE &&
  (Object.values(RatingType) as string[]).includes(action.payload.feedback);

type AppActionWithMetaUrl = AppActionWithMeta & { meta: ActionMetaWithTab };

type RatingActionTransformer = (action: AppActionWithMetaUrl) => Rating;

const createDefaultTransformer = (
  ratingType: RatingType
): RatingActionTransformer => ({
  payload: id,
  meta: {
    tab: { url }
  }
}) => ({
  noticeId: id as number,
  rating: ratingType,
  url
});

export const transformers: {
  pattern: ActionPattern;
  transformer: RatingActionTransformer;
}[] = [
  {
    pattern: isFeedBackRatingAction,
    transformer: (({
      payload: { id, feedback },
      meta: {
        tab: { url }
      }
    }: ReceivedFeedbackOnNoticeAction) => ({
      noticeId: id,
      rating: feedback,
      url
    })) as RatingActionTransformer
  },
  {
    pattern: NOTICE_UNFOLDED,
    transformer: createDefaultTransformer(RatingType.UNFOLD)
  },
  {
    pattern: NOTICE_BADGED,
    transformer: createDefaultTransformer(RatingType.BADGED)
  },
  {
    pattern: OUTBOUND_LINK_CLICKED,
    transformer: (({
      payload: { id, clickedUrl }
    }: OutboundLinkClickedAction) => ({
      noticeId: id,
      rating: RatingType.OUTBOUND_CLICK,
      url: clickedUrl
    })) as RatingActionTransformer
  },
  {
    pattern: NOTICE_DISPLAYED,
    transformer: createDefaultTransformer(RatingType.DISPLAY)
  }
];

export const createPostRatingSaga = (transformer: RatingActionTransformer) =>
  function* postRatingSaga(action: AppActionWithMetaUrl): SagaIterator {
    const rating = transformer(action);

    try {
      yield call(postRating, rating);
    } catch (e) {
      // That’s just one like missing …
      // … and we don’t retry because we don’t want to count twice
    }
  };

export default function* ratingsRootSaga() {
  yield all(
    transformers.map(({ pattern, transformer }) =>
      takeEvery(pattern, createPostRatingSaga(transformer))
    )
  );
}
