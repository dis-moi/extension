import { TabAction } from './';
import Tab from 'app/lmem/tab';

export const SHOW_BULLES_UPDATE_SERVICE_MESSAGE =
  'SHOW_BULLES_UPDATE_SERVICE_MESSAGE';
export interface ShowBullesUpdateMessageAction extends TabAction {
  type: typeof SHOW_BULLES_UPDATE_SERVICE_MESSAGE;
  payload: {
    date: Date;
  };
}
export const showBullesUpdateMessage = (
  tab: Tab
): ShowBullesUpdateMessageAction => ({
  type: SHOW_BULLES_UPDATE_SERVICE_MESSAGE,
  payload: { date: new Date() },
  meta: {
    tab,
    sendToTab: true
  }
});
