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
