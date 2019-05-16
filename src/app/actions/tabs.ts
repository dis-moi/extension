import {
  ignoringReason,
  StatefulNotice,
  IgnoringReason,
  Notice
} from 'app/lmem/notice';
import { InstallationDetails } from 'app/lmem/installation';
import { MatchingContext } from 'app/lmem/matchingContext';
import { BaseAction, TabAction, TabErrorAction } from '.';

export interface InitAction extends TabAction {
  type: 'INIT';
  payload: {
    tab: number;
    installationDetails: InstallationDetails;
  };
}

export const init = (
  tab: number,
  installationDetails: InstallationDetails
): InitAction => ({
  type: 'INIT',
  payload: {
    tab,
    installationDetails
  },
  meta: { tab, sendToTab: true }
});

export interface MatchContextAction extends TabAction {
  type: 'LMEM/MATCH_CONTEXT';
  payload: { url: string; tab: number };
}
export const matchContext = (url: string, tab: number): MatchContextAction => ({
  type: 'LMEM/MATCH_CONTEXT',
  payload: { url, tab },
  meta: { tab, tracked: false }
});

export interface MatchContextFailureAction extends TabErrorAction {
  type: 'LMEM/MATCH_CONTEXT_FAILURE';
}
export const matchContextFailure = (
  error: Error,
  url: string,
  tab: number
): MatchContextFailureAction => ({
  type: 'LMEM/MATCH_CONTEXT_FAILURE',
  payload: error,
  meta: { url, tab, tracked: false },
  error: true
});

export interface ContextTriggeredAction extends TabAction {
  type: 'LMEM/CONTEXT_TRIGGERED';
  payload: {
    url: string;
    tab: number;
    triggeredContexts: MatchingContext[];
  };
}
export const contextTriggered = (
  tab: number,
  url: string,
  triggeredContexts: MatchingContext[]
): ContextTriggeredAction => ({
  type: 'LMEM/CONTEXT_TRIGGERED',
  payload: { tab, url, triggeredContexts },
  meta: { tab }
});

export interface ContextTriggerFailureAction extends TabErrorAction {
  type: 'LMEM/CONTEXT_TRIGGER_FAILURE';
  meta: { url: string; tab: number };
}
export const contextTriggerFailure = (
  error: Error,
  tab: number,
  url: string
): ContextTriggerFailureAction => ({
  type: 'LMEM/CONTEXT_TRIGGER_FAILURE',
  payload: error,
  meta: { url, tab },
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
