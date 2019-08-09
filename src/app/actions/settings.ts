import Tab from 'app/lmem/Tab';
import { BaseAction } from './';

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
