import { StatefulNotice } from 'app/lmem/notice';
import { BaseAction, TabAction, TabMeta } from '.';

export interface NoticesFoundAction extends TabAction {
  type: 'NOTICES_FOUND';
  payload: {
    notices: StatefulNotice[];
  };
}

export const noticesFound = (
  notices: StatefulNotice[],
  tab: number
): NoticesFoundAction => ({
  type: 'NOTICES_FOUND',
  payload: {
    notices
  },
  meta: {
    tab,
    sendToTab: true
  }
});

export type feedbackType =
  | 'dismiss'
  | 'undismiss'
  | 'like'
  | 'unlike'
  | 'dislike'
  | 'undislike';

export interface FeedbackOnNoticeAction extends BaseAction {
  type: 'FEEDBACK_ON_NOTICE';
  payload: { id: number; feedback: feedbackType };
}

export const dismissNotice = (id: number): FeedbackOnNoticeAction => ({
  type: 'FEEDBACK_ON_NOTICE',
  payload: { id, feedback: 'dismiss' },
  meta: { sendToBackground: true }
});

export const undismissNotice = (id: number): FeedbackOnNoticeAction => ({
  type: 'FEEDBACK_ON_NOTICE',
  payload: { id, feedback: 'undismiss' },
  meta: { sendToBackground: true }
});

export const likeNotice = (id: number): FeedbackOnNoticeAction => ({
  type: 'FEEDBACK_ON_NOTICE',
  payload: { id, feedback: 'like' },
  meta: { sendToBackground: true }
});

export const unlikeNotice = (id: number): FeedbackOnNoticeAction => ({
  type: 'FEEDBACK_ON_NOTICE',
  payload: { id, feedback: 'unlike' },
  meta: { sendToBackground: true }
});

export const dislikeNotice = (id: number): FeedbackOnNoticeAction => ({
  type: 'FEEDBACK_ON_NOTICE',
  payload: { id, feedback: 'dislike' },
  meta: { sendToBackground: true }
});

export const undislikeNotice = (id: number): FeedbackOnNoticeAction => ({
  type: 'FEEDBACK_ON_NOTICE',
  payload: { id, feedback: 'undislike' },
  meta: { sendToBackground: true }
});

export interface ReadNoticeAction extends BaseAction {
  type: 'READ_NOTICE';
  payload: number;
}

export const readNotice = (id: number): ReadNoticeAction => ({
  type: 'READ_NOTICE',
  payload: id,
  meta: { sendToBackground: true }
});

export interface NoticesUpdatedAction extends TabAction {
  type: 'NOTICES_UPDATED';
  payload: StatefulNotice[];
}

export const noticesUpdated = (
  payload: StatefulNotice[],
  meta: TabMeta
): NoticesUpdatedAction => ({
  type: 'NOTICES_UPDATED',
  payload,
  meta
});
