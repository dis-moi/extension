import Tab from 'app/lmem/Tab';
import { BaseAction, ErrorAction } from './';

export interface SettingsRequestedAction extends BaseAction {
  type: 'SETTINGS_REQUESTED';
}

export const settingsRequested = (): SettingsRequestedAction => ({
  type: 'SETTINGS_REQUESTED',
  meta: {
    sendToBackground: true
  }
});

export interface SettingsTabOpened extends BaseAction {
  type: 'SETTINGS_TAB_OPENED';
  payload: Tab;
}

export const settingsTabOpened = (tab: Tab): SettingsTabOpened => ({
  type: 'SETTINGS_TAB_OPENED',
  payload: tab
});

export interface SettingsTabOpenFailedAction extends ErrorAction {
  type: 'SETTINGS_TAB_OPEN_FAILED';
}

export const settingsTabOpenFailed = (
  error: Error
): SettingsTabOpenFailedAction => ({
  type: 'SETTINGS_TAB_OPEN_FAILED',
  error: true,
  payload: error
});
