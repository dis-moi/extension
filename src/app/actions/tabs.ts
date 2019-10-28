import { InstallationDetails } from 'app/lmem/installation';
import { MatchingContext } from 'app/lmem/matchingContext';
import Tab from 'app/lmem/tab';
import { ReceivedAction } from 'webext/createMessageHandler';
import { BaseAction, TabAction, TabErrorAction } from '.';

export interface InitAction extends TabAction {
  type: 'INIT';
  payload: InstallationDetails;
}

export const init = (
  installationDetails: InstallationDetails,
  tab: Tab
): InitAction => ({
  type: 'INIT',
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

export interface MatchContextAction extends TabAction {
  type: 'LMEM/MATCH_CONTEXT';
}
export const matchContext = (tab: Tab): MatchContextAction => ({
  type: 'LMEM/MATCH_CONTEXT',
  meta: { tab }
});

export interface MatchContextFailureAction extends TabErrorAction {
  type: 'LMEM/MATCH_CONTEXT_FAILURE';
}
export const matchContextFailure = (
  error: Error,
  tab: Tab
): MatchContextFailureAction => ({
  type: 'LMEM/MATCH_CONTEXT_FAILURE',
  payload: error,
  meta: { tab },
  error: true
});

export interface ContextTriggeredAction extends TabAction {
  type: 'LMEM/CONTEXT_TRIGGERED';
  payload: MatchingContext[];
}
export const contextTriggered = (
  triggeredContexts: MatchingContext[],
  tab: Tab
): ContextTriggeredAction => ({
  type: 'LMEM/CONTEXT_TRIGGERED',
  payload: triggeredContexts,
  meta: { tab }
});

export interface ContextNotTriggeredAction extends TabAction {
  type: 'LMEM/CONTEXT_NOT_TRIGGERED';
  payload: MatchingContext[];
}
export const contextNotTriggered = (
  triggeredContexts: MatchingContext[],
  tab: Tab
): ContextNotTriggeredAction => ({
  type: 'LMEM/CONTEXT_NOT_TRIGGERED',
  payload: triggeredContexts,
  meta: { tab, sendToTab: true }
});

export interface ContextTriggerFailureAction extends TabErrorAction {
  type: 'LMEM/CONTEXT_TRIGGER_FAILURE';
}
export const contextTriggerFailure = (
  error: Error,
  tab: Tab
): ContextTriggerFailureAction => ({
  type: 'LMEM/CONTEXT_TRIGGER_FAILURE',
  payload: error,
  meta: { tab },
  error: true
});
