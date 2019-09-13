import { BaseAction } from './index';

export const SHOW_BULLES_UPGRADE_SERVICE_MESSAGE =
  'SHOW_BULLES_UPGRADE_SERVICE_MESSAGE';
export interface ShowBullesUpgradeServiceMessageAction extends BaseAction {
  type: typeof SHOW_BULLES_UPGRADE_SERVICE_MESSAGE;
  payload: {
    date: Date;
  };
}
export const showBullesUpgradeServiceMessage = (): ShowBullesUpgradeServiceMessageAction => ({
  type: SHOW_BULLES_UPGRADE_SERVICE_MESSAGE,
  payload: { date: new Date() }
});
