import {
  ignoringReason,
  StatefulNotice,
  IgnoringReason,
  Notice
} from 'app/lmem/notice';
import { InstallationDetails } from 'app/lmem/installation';
import { MatchingContext } from 'app/lmem/matchingContext';
import { BaseAction, TabAction, TabErrorAction } from '.';
import Tab from 'app/lmem/tab';

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
  meta: { tab }
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

export interface NoticeDisplayedAction extends BaseAction {
  type: 'NOTICE_DISPLAYED';
  payload: {
    notice: Notice;
    url: string;
  };
}
export const noticeDisplayed = (
  notice: Notice,
  url: string
): NoticeDisplayedAction => ({
  type: 'NOTICE_DISPLAYED',
  payload: { notice, url }
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
  payload: { notice, reason: ignoringReason(notice), url }
});
