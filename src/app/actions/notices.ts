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

export type FeedbackType =
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
  payload: { id: number; feedback: FeedbackType };
}

export const createFeedbackOnNoticeAction = (
  id: number,
  feedback: FeedbackType
): FeedbackOnNoticeAction => ({
  type: 'FEEDBACK_ON_NOTICE',
  payload: { id, feedback },
  meta: { sendToBackground: true }
});

export const dismissNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'dismiss');

export const confirmDismissNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'confirmDismiss');

export const undismissNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'undismiss');

export const likeNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'like');

export const unlikeNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'unlike');

export const dislikeNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'dislike');

export const confirmDislikeNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'confirmDislike');

export const undislikeNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'undislike');

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

export interface NoticeBadgedAction extends BaseAction {
  type: 'NOTICE_BADGED';
  payload: number;
}

export const noticeBadged = (id: number): NoticeBadgedAction => ({
  type: 'NOTICE_BADGED',
  payload: id
});

export interface OutboundLinkClickedAction extends BaseAction {
  type: 'NOTICE/OUTBOUND_LINK_CLICKED';
  payload: number;
}

export const outboundLinkClicked = (id: number): OutboundLinkClickedAction => ({
  type: 'NOTICE/OUTBOUND_LINK_CLICKED',
  payload: id
});
