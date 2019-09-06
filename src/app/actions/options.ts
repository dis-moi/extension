import Tab from 'app/lmem/Tab';
import { BaseAction, ErrorAction } from './';

export interface OptionsRequestedAction extends BaseAction {
  type: 'OPTIONS_REQUESTED';
}

export const optionsRequested = (): OptionsRequestedAction => ({
  type: 'OPTIONS_REQUESTED',
  meta: {
    sendToBackground: true
  }
});

export interface OptionsTabOpened extends BaseAction {
  type: 'OPTIONS_TAB_OPENED';
  payload: Tab;
}

export const optionsTabOpened = (tab: Tab): OptionsTabOpened => ({
  type: 'OPTIONS_TAB_OPENED',
  payload: tab
});

export interface OptionsTabOpenFailedAction extends ErrorAction {
  type: 'OPTIONS_TAB_OPEN_FAILED';
}

export const optionsTabOpenFailed = (
  error: Error
): OptionsTabOpenFailedAction => ({
  type: 'OPTIONS_TAB_OPEN_FAILED',
  error: true,
  payload: error
});
