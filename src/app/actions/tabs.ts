import { InstallationDetails } from 'app/lmem/installation';
import { MatchingContext } from 'app/lmem/matchingContext';
import Tab from 'app/lmem/tab';
import { ReceivedAction } from 'webext/createMessageHandler';
import { Level } from '../utils/Logger';
import { BaseAction, TabAction, TabErrorAction } from '.';

export const INIT = 'INIT';
export interface InitAction extends TabAction {
  type: typeof INIT;
  payload: InstallationDetails;
}

export const init = (
  installationDetails: InstallationDetails,
  tab: Tab
): InitAction => ({
  type: INIT,
  payload: installationDetails,
  meta: { tab, sendToTab: true }
});

export const NAVIGATED_TO_URL = 'NAVIGATED_TO_URL';
export interface NavigatedToUrlAction extends BaseAction {
  type: typeof NAVIGATED_TO_URL;
  payload: {
    url: string;
  };
}
export type ReceivedNavigatedToUrlAction = NavigatedToUrlAction &
  ReceivedAction;

export const navigatedToUrl = (url: string): NavigatedToUrlAction => ({
  type: NAVIGATED_TO_URL,
  payload: { url },
  meta: {
    sendToBackground: true
  }
});

export const MATCH_CONTEXT = 'LMEM/MATCH_CONTEXT';
export interface MatchContextAction extends TabAction {
  type: typeof MATCH_CONTEXT;
}
export const matchContext = (tab: Tab): MatchContextAction => ({
  type: MATCH_CONTEXT,
  meta: { tab }
});

export const MATCH_CONTEXT_FAILURE = 'LMEM/MATCH_CONTEXT_FAILURE';
export interface MatchContextFailureAction extends TabErrorAction {
  type: typeof MATCH_CONTEXT_FAILURE;
}
export const matchContextFailure = (
  error: Error,
  tab: Tab
): MatchContextFailureAction => ({
  type: MATCH_CONTEXT_FAILURE,
  payload: error,
  meta: { tab, severity: Level.ERROR },
  error: true
});

export const CONTEXT_TRIGGERED = 'LMEM/CONTEXT_TRIGGERED';
export interface ContextTriggeredAction extends TabAction {
  type: typeof CONTEXT_TRIGGERED;
  payload: MatchingContext[];
}
export const contextTriggered = (
  triggeredContexts: MatchingContext[],
  tab: Tab
): ContextTriggeredAction => ({
  type: CONTEXT_TRIGGERED,
  payload: triggeredContexts,
  meta: { tab }
});

export const CONTEXT_NOT_TRIGGERED = 'LMEM/CONTEXT_NOT_TRIGGERED';
export interface ContextNotTriggeredAction extends TabAction {
  type: typeof CONTEXT_NOT_TRIGGERED;
  payload: MatchingContext[];
}
export const contextNotTriggered = (
  triggeredContexts: MatchingContext[],
  tab: Tab
): ContextNotTriggeredAction => ({
  type: CONTEXT_NOT_TRIGGERED,
  payload: triggeredContexts,
  meta: { tab, sendToTab: true }
});

export const CONTEXT_TRIGGER_FAILURE = 'LMEM/CONTEXT_TRIGGER_FAILURE';
export interface ContextTriggerFailureAction extends TabErrorAction {
  type: typeof CONTEXT_TRIGGER_FAILURE;
}
export const contextTriggerFailure = (
  error: Error,
  tab: Tab
): ContextTriggerFailureAction => ({
  type: CONTEXT_TRIGGER_FAILURE,
  payload: error,
  meta: { tab, severity: Level.ERROR },
  error: true
});
