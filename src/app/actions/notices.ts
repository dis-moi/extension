import { StatefulNotice } from 'app/lmem/notice';
import Tab from 'app/lmem/tab';
import { ActionMeta, BaseAction, TabAction } from '.';

export interface NoticesFoundAction extends TabAction {
  type: 'NOTICES_FOUND';
  payload: {
    notices: StatefulNotice[];
  };
}

export const noticesFound = (
  notices: StatefulNotice[],
  tab: Tab
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

// Context was triggered but they were no notices left to display
export interface NoNoticesDisplayedAction extends TabAction {
  type: 'NO_NOTICES_DISPLAYED';
}

export const noNoticesDisplayed = (tab: Tab): NoNoticesDisplayedAction => ({
  type: 'NO_NOTICES_DISPLAYED',
  meta: {
    tab
  }
});

export type feedbackType =
  | 'dismiss'
  | 'confirmDismiss'
  | 'undismiss'
  | 'like'
  | 'unlike'
  | 'dislike'
  | 'confirmDislike'
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

export const confirmDismissNotice = (id: number): FeedbackOnNoticeAction => ({
  type: 'FEEDBACK_ON_NOTICE',
  payload: { id, feedback: 'confirmDismiss' },
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

export const confirmDislikeNotice = (id: number): FeedbackOnNoticeAction => ({
  type: 'FEEDBACK_ON_NOTICE',
  payload: { id, feedback: 'confirmDislike' },
  meta: { sendToBackground: true }
});

export const undislikeNotice = (id: number): FeedbackOnNoticeAction => ({
  type: 'FEEDBACK_ON_NOTICE',
  payload: { id, feedback: 'undislike' },
  meta: { sendToBackground: true }
});

export interface UnfoldNoticeAction extends BaseAction {
  type: 'UNFOLD_NOTICE';
  payload: number;
}

export const unfoldNotice = (id: number): UnfoldNoticeAction => ({
  type: 'UNFOLD_NOTICE',
  payload: id
});

export interface MarkNoticeReadAction extends BaseAction {
  type: 'MARK_NOTICE_READ';
  payload: number;
}

export const markNoticeRead = (
  id: number,
  meta?: ActionMeta
): MarkNoticeReadAction => ({
  type: 'MARK_NOTICE_READ',
  payload: id,
  meta
});

export interface ResourceLinkClickedAction extends BaseAction {
  type: 'NOTICE/RESOURCE_LINK_CLICKED';
  payload: number;
}

export const resourceLinkClicked = (id: number): ResourceLinkClickedAction => ({
  type: 'NOTICE/RESOURCE_LINK_CLICKED',
  payload: id
});
