import { Action } from 'redux';
import { LocationChangeAction } from 'connected-react-router';
import Tab from 'app/lmem/Tab';
import { BrowserActionClickedAction } from './browser';
import {
  TabCreatedAction,
  TabRemovedAction,
  TabUpdatedAction
} from './tabsLifecycle';
import { InstalledAction } from './install';
import {
  RefreshMatchingContextsFailedAction,
  ReceivedMatchingContextsAction
} from './refreshMatchingContexts';
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
import {
  RemoveUITitleAction,
  SetUITitleAction
} from '../content/actions/ui/title';
import { OptionsRequestedAction, OptionsTabOpened } from './options';
import {
  ContributorsTransmittedAction,
  ReceivedContributorsAction,
  RefreshContributorsFailedAction
} from './refreshContributors';
import {
  ListenActionFailedAction,
  ListeningActionsReadyAction
} from './webext';
import { From } from '../../webext/From';

type MessageSender = chrome.runtime.MessageSender;

export * from './badge';
export * from './browser';
export * from './filters';
export * from './install';
export * from './notices';
export * from './refreshMatchingContexts';
export * from './refreshContributors';
export * from './options';
export * from './tabs';
export * from './tabsLifecycle';
export * from './ui';
export * from './updateDraftNotices';
export * from './webext';

export interface StandardAction extends Action {
  payload?: unknown;
  meta?: unknown;
  error?: true;
}

export interface BaseAction extends StandardAction {
  meta?: ActionMeta;
}

export interface ErrorAction extends BaseAction {
  payload: Error;
  error: true;
}

export const createErrorAction = (type: unknown = 'ERROR') => (
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
  action?: unknown;
  external?: boolean;
  sender?: MessageSender;
  from?: From;
  tab?: Tab;
}

export type AppAction =
  | InitAction
  | BrowserActionClickedAction
  | TabCreatedAction
  | TabUpdatedAction
  | TabRemovedAction
  | InstalledAction
  | RefreshMatchingContextsFailedAction
  | ReceivedMatchingContextsAction
  | MatchContextAction
  | MatchContextFailureAction
  | ReceivedContributorsAction
  | RefreshContributorsFailedAction
  | ContributorsTransmittedAction
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
  | SetUITitleAction
  | RemoveUITitleAction
  | OptionsRequestedAction
  | OptionsTabOpened
  | ListeningActionsReadyAction
  | ListenActionFailedAction
  | (LocationChangeAction & { meta?: ActionMeta });
