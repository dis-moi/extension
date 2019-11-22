import {
  getIgnoringReason,
  IgnoringReason,
  Notice,
  StatefulNotice
} from 'app/lmem/notice';
import Tab from 'app/lmem/tab';
import { ActionMeta, BaseAction, TabAction } from '.';

export interface NoticesFetchedAction extends BaseAction {
  type: 'NOTICES/FETCHED';
  payload: Notice[];
}

export const noticesFetched = (notices: Notice[]): NoticesFetchedAction => ({
  type: 'NOTICES/FETCHED',
  payload: notices
});

export interface NoticeDisplayedAction extends BaseAction {
  type: 'NOTICE/DISPLAYED';
  payload: number;
}
export const noticeDisplayed = (id: number): NoticeDisplayedAction => ({
  type: 'NOTICE/DISPLAYED',
  payload: id,
  meta: { sendToBackground: true }
});

export interface NoticeIgnoredAction extends BaseAction {
  type: 'NOTICE_IGNORED';
  payload: { notice: Notice; reason: IgnoringReason; url: string };
}
export const noticeIgnored = (
  notice: StatefulNotice,
  url: string
): NoticeIgnoredAction => ({
  type: 'NOTICE_IGNORED',
  payload: { notice, reason: getIgnoringReason(notice), url }
});

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
    tab,
    sendToTab: true
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
  type: 'NOTICE/UNFOLDED';
  payload: number;
}

export const unfoldNotice = (id: number): UnfoldNoticeAction => ({
  type: 'NOTICE/UNFOLDED',
  payload: id,
  meta: { sendToBackground: true }
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
  type: 'NOTICE/BADGED';
  payload: number;
  meta: { tab?: Tab };
}

export const noticeBadged = (id: number, tab?: Tab): NoticeBadgedAction => ({
  type: 'NOTICE/BADGED',
  payload: id,
  meta: { tab }
});

export interface OutboundLinkClickedAction extends BaseAction {
  type: 'NOTICE/OUTBOUND_LINK_CLICKED';
  payload: number;
  meta: ActionMeta & { url?: string };
}

export const outboundLinkClicked = (
  id: number,
  url?: string
): OutboundLinkClickedAction => ({
  type: 'NOTICE/OUTBOUND_LINK_CLICKED',
  payload: id,
  meta: { sendToBackground: true, url }
});
