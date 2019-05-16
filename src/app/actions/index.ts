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

export interface TabMeta extends ActionMeta {
  tab: number;
  url?: string;
}

export type TabAction = BaseAction & {
  meta: TabMeta;
};

export type TabErrorAction = TabAction & ErrorAction;

export interface ActionMeta {
  tab?: number;
  sendToBackground?: boolean;
  sendToTab?: boolean;
  tracked?: false;
}

export type AppAction =
  | InitAction
  | BrowserActionClickedAction
  | TabCreatedAction
  | TabUpdatedAction
  | TabRemovedAction
  | InstalledAction
  | RefreshMatchingContextsAction
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
