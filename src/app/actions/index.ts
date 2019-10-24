import { Action } from 'redux';
import { LocationChangeAction } from 'connected-react-router';
import Tab from 'app/lmem/tab';
import { BrowserActionClickedAction } from './browser';
import {
  TabCreatedAction,
  TabRemovedAction,
  TabUpdatedAction
} from './tabsLifecycle';
import { InstalledAction, InstallationDetailsAction } from './install';
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
import { CloseAction, ClosedAction, OpenAction, OpenedAction } from './ui';
import {
  FeedbackOnNoticeAction,
  MarkNoticeReadAction,
  NoticesFoundAction,
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
import { ShowBullesUpdateMessageAction } from './bullesUpdate.actions';
import { LoadedAction } from '../content/actions/ui/open.actions';

type MessageSender = chrome.runtime.MessageSender;

export * from './badge';
export * from './browser';
export * from './install';
export * from './notices';
export * from './refreshMatchingContexts';
export * from './refreshContributors';
export * from './options';
export * from './tabs';
export * from './tabsLifecycle';
export * from './tos';
export * from './ui';
export * from './updateDraftNotices';
export * from './subscription';
export * from './webext';
export * from './bullesUpdate.actions';

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
  | ShowBullesUpdateMessageAction
  | LoadedAction
  | (LocationChangeAction & { meta?: ActionMeta });
