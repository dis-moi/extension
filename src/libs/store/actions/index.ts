import { LocationChangeAction } from 'connected-react-router';
import * as R from 'ramda';
import Tab from 'libs/lmem/tab';
import { StandardAction } from 'libs/store/types';

import { From } from 'libs/webext/From';

import { Level } from 'libs/utils/Logger';
import { BrowserActionClickedAction } from './browser';
import { InstallationDetailsAction, InstalledAction } from './install';
import {
  ReceivedMatchingContextsAction,
  RefreshMatchingContextsFailedAction
} from './refreshMatchingContexts';
import {
  ContextNotTriggeredAction,
  ContextTriggeredAction,
  ContextTriggerFailureAction,
  InitAction,
  MatchContextAction,
  MatchContextFailureAction,
  NavigatedToUrlAction
} from './tabs';
import {
  CloseAction,
  ClosedAction,
  LocationChangedAction,
  OpenAction,
  OpenedAction
} from './ui';
import {
  FeedbackOnNoticeAction,
  MarkNoticeReadAction,
  NoNoticesDisplayedAction,
  NoticeDisplayedAction,
  NoticeIgnoredAction,
  NoticesFetchedAction,
  NoticesFoundAction,
  OutboundLinkClickedAction,
  UnfoldNoticeAction
} from './notices';
import {
  AcceptTosAction,
  TosAcceptedAction,
  TransmitTOSStatusAction
} from './tos';
import {
  ContributionSubmissionFailedAction,
  ContributionSubmittedAction,
  SubmitContributionAction
} from './contribution';
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
import { SubscribeAction, UnsubscribeAction } from './subscription';
import { ShowServiceMessageAction } from './serviceMessage.actions';
import { TabDiedAction, TabRemovedAction } from './tabsLifecycle';
import { UpdateRestrictedContextsAction } from './restrictedContexts';
import { LoginAction } from './user';

type MessageSender = browser.runtime.MessageSender;

export * from './badge';
export * from './tabsLifecycle';
export * from './browser';
export * from './i18n';
export * from './install';
export * from './notices';
export * from './refreshMatchingContexts';
export * from './restrictedContexts';
export * from './refreshContributors';
export * from './options';
export * from './tabs';
export * from './tos';
export * from './ui';
export * from './subscription';
export * from './webext';
export * from './serviceMessage.actions';

export interface BaseAction extends StandardAction {
  meta?: ActionMeta;
}

export interface TimestampedAction extends BaseAction {
  meta: { at: Date } & ActionMeta;
}

export type ErrorMeta = ActionMetaWithSeverity;

export interface ErrorAction extends BaseAction {
  payload: Error;
  error: true;
  meta: ErrorMeta;
}

export interface FormAction extends BaseAction {
  payload: {};
  meta: ActionMeta & FormMeta;
}

export type TabFormMeta = TabMeta & FormMeta;

export interface TabFormAction extends TabAction {
  payload: {};
  meta: TabFormMeta;
}

export interface TabMeta extends ActionMeta {
  tab: Tab;
}

export interface TabAction extends BaseAction {
  meta: TabMeta;
}

export type TabErrorAction = TabAction & ErrorAction;

export type TabFormErrorAction = TabFormAction & ErrorAction;

export interface FormMeta {
  form: string;
  resolve: (...args: any[]) => void;
  reject: (...args: any[]) => void;
}

export interface ActionMeta {
  sendToBackground?: boolean;
  sendToTab?: boolean;
  action?: unknown;
  external?: boolean;
  receiver?: MessageSender;
  sender?: MessageSender;
  from?: From;
  fromText?: string;
  tab?: Tab;
}

export interface ActionMetaWithTab extends ActionMeta {
  tab: Tab;
}

export interface ActionMetaWithSeverity extends ActionMeta {
  severity: Level;
}

export const getURLFromActionMeta = (action: BaseAction): string =>
  R.path(['meta', 'tab', 'url'], action) as string;

export type AppAction =
  | InitAction
  | BrowserActionClickedAction
  | NavigatedToUrlAction
  | InstalledAction
  | TabRemovedAction
  | TabDiedAction
  | ContextNotTriggeredAction
  | NoNoticesDisplayedAction
  | RefreshMatchingContextsFailedAction
  | ReceivedMatchingContextsAction
  | UpdateRestrictedContextsAction
  | MatchContextAction
  | MatchContextFailureAction
  | ReceivedContributorsAction
  | RefreshContributorsFailedAction
  | ContributorsTransmittedAction
  | ContextTriggeredAction
  | ContextTriggerFailureAction
  | NoticeDisplayedAction
  | NoticeIgnoredAction
  | InstallationDetailsAction
  | OpenAction
  | OpenedAction
  | CloseAction
  | ClosedAction
  | NoticesFoundAction
  | FeedbackOnNoticeAction
  | UnfoldNoticeAction
  | MarkNoticeReadAction
  | SubmitContributionAction
  | ContributionSubmittedAction
  | ContributionSubmissionFailedAction
  | OptionsRequestedAction
  | OptionsTabOpened
  | ListeningActionsReadyAction
  | ListenActionFailedAction
  | SubscribeAction
  | UnsubscribeAction
  | AcceptTosAction
  | TosAcceptedAction
  | TransmitTOSStatusAction
  | ShowServiceMessageAction
  | NoticesFetchedAction
  | LocationChangedAction
  | OutboundLinkClickedAction
  | LoginAction
  | (LocationChangeAction & { meta?: ActionMeta });

export type AppActionWithMeta = AppAction & BaseAction;
