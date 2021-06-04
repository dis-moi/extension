import Tab from 'libs/domain/tab';
import { Level } from 'libs/utils/Logger';
import { GetParams } from 'libs/api/call';
import { BaseAction, ErrorAction } from './';

export const OPTIONS_REQUESTED = 'OPTIONS_REQUESTED';
export interface OptionsRequestedAction extends BaseAction {
  type: typeof OPTIONS_REQUESTED;
  payload: {
    pathname?: string;
    params?: GetParams;
  };
}

export const optionsRequested = (
  payload: {
    pathname?: string;
    params?: GetParams;
  } = {}
): OptionsRequestedAction => ({
  type: OPTIONS_REQUESTED,
  payload,
  meta: {
    sendToBackground: true
  }
});

export const OPTIONS_TAB_OPENED = 'OPTIONS_TAB_OPENED';
export interface OptionsTabOpened extends BaseAction {
  type: typeof OPTIONS_TAB_OPENED;
  payload: Tab;
}

export const optionsTabOpened = (tab: Tab): OptionsTabOpened => ({
  type: OPTIONS_TAB_OPENED,
  payload: tab
});

export const OPTIONS_TAB_OPEN_FAILED = 'OPTIONS_TAB_OPEN_FAILED';
export interface OptionsTabOpenFailedAction extends ErrorAction {
  type: typeof OPTIONS_TAB_OPEN_FAILED;
}

export const optionsTabOpenFailed = (
  error: Error
): OptionsTabOpenFailedAction => ({
  type: OPTIONS_TAB_OPEN_FAILED,
  error: true,
  payload: error,
  meta: { severity: Level.ERROR }
});
