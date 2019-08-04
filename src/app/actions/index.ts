import { LocationChangeAction } from 'connected-react-router';
import { BrowserActionClickedAction } from './browser';
import {
  TabCreatedAction,
  TabRemovedAction,
  TabUpdatedAction
} from './tabsLifecycle';
import { InstalledAction } from './install';
import {
  RefreshMatchingContextsAction,
  RefreshMatchingContextsFailedAction,
  ReceivedMatchingContextsAction
} from './kraftBackend';
import {
  InitAction,
  MatchContextAction,
  MatchContextFailureAction,
  NoticeIgnoredAction,
  NoticeDisplayedAction,
  ContextTriggeredAction,
  ContextTriggerFailureAction
} from './tabs';
import { InstalledDetailsAction } from './filters';
import { CloseAction, ClosedAction, OpenAction, OpenedAction } from './ui';
import {
  FeedbackOnNoticeAction,
  NoticesFoundAction,
  ReadNoticeAction
} from './notices';
import { Action } from 'redux';
import Tab from 'app/lmem/Tab';
import MessageSender = chrome.runtime.MessageSender;

export interface StandardAction extends Action {
  payload?: any;
  meta?: any;
  error?: true;
}

export interface BaseAction extends StandardAction {
  meta?: ActionMeta;
}

export interface ErrorAction extends BaseAction {
  payload: Error;
  error: true;
}

export const createErrorAction = (type: any = 'ERROR') => (
  e: Error,
  meta?: ActionMeta
): ErrorAction => ({
  type,
  payload: e,
  error: true,
  meta
});

export interface TabMeta extends ActionMeta {
  tab: Tab;
}

export interface TabAction extends BaseAction {
  meta: TabMeta;
}

export type TabErrorAction = TabAction & ErrorAction;

export interface ActionMeta {
  sendToBackground?: boolean;
  sendToTab?: boolean;
  tracked?: boolean;
  action?: any;
  external?: boolean;
  sender?: MessageSender;
}

export type AppAction =
  | InitAction
  | BrowserActionClickedAction
  | TabCreatedAction
  | TabUpdatedAction
  | TabRemovedAction
  | InstalledAction
  | RefreshMatchingContextsAction
  | RefreshMatchingContextsFailedAction
  | ReceivedMatchingContextsAction
  | MatchContextAction
  | MatchContextFailureAction
  | ContextTriggeredAction
  | ContextTriggerFailureAction
  | NoticeDisplayedAction
  | NoticeIgnoredAction
  | InstalledDetailsAction
  | OpenAction
  | OpenedAction
  | CloseAction
  | ClosedAction
  | NoticesFoundAction
  | FeedbackOnNoticeAction
  | ReadNoticeAction
  | (LocationChangeAction & { meta?: ActionMeta });
