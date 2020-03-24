import { Action } from 'redux';
import { LocationChangeAction } from 'connected-react-router';
import Tab from 'app/lmem/tab';
import { BrowserActionClickedAction } from './browser';
import { InstalledAction, InstallationDetailsAction } from './install';
import {
  RefreshMatchingContextsFailedAction,
  ReceivedMatchingContextsAction
} from './refreshMatchingContexts';
import {
  InitAction,
  MatchContextAction,
  MatchContextFailureAction,
  ContextTriggeredAction,
  ContextTriggerFailureAction,
  NavigatedToUrlAction,
  ContextNotTriggeredAction
} from './tabs';
import {
  CloseAction,
  ClosedAction,
  OpenAction,
  OpenedAction,
  LocationChangedAction
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
  ContributionSubmissionFailed,
  ContributionSubmittedAction,
  SubmitContributionAction
} from './contribution';
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
import { SubscribeAction, UnsubscribeAction } from './subscription';
import { ShowServiceMessageAction } from './serviceMessage.actions';
import { LoadedAction } from '../content/actions/ui/open.actions';
import { TabDiedAction, TabRemovedAction } from './tabsLifecycle';
import { UpdateRestrictedContextsAction } from './restrictedContexts';
import { LoginAction } from './user';
import * as R from 'ramda';
import { Level } from '../utils/Logger';

type MessageSender = chrome.runtime.MessageSender;

export * from './badge';
export * from './tabsLifecycle';
export * from './browser';
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

export interface StandardAction extends Action {
  payload?: unknown;
  meta?: unknown;
  error?: true;
}

export interface BaseAction extends StandardAction {
  meta?: ActionMeta;
}

export interface TimestampedAction extends BaseAction {
  meta: { at: Date } & ActionMeta;
}

export interface ErrorAction extends BaseAction {
  payload: Error;
  error: true;
  meta: ActionMeta & {
    severity: Level;
  };
}

export const createErrorAction = (type: unknown = 'ERROR') => (
  e: Error,
  meta: ActionMetaWithSeverity
): ErrorAction => ({
  type,
  payload: e,
  error: true,
  meta
});

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
  sender?: MessageSender;
  from?: From;
  tab?: Tab;
}

export interface ActionMetaWithSeverity {
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
  | SetUITitleAction
  | RemoveUITitleAction
  | SubmitContributionAction
  | ContributionSubmittedAction
  | ContributionSubmissionFailed
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
  | LoadedAction
  | NoticesFetchedAction
  | LocationChangedAction
  | OutboundLinkClickedAction
  | LoginAction
  | (LocationChangeAction & { meta?: ActionMeta });
