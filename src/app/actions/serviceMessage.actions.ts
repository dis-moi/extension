import { TabAction } from './';
import Tab from 'app/lmem/tab';
import { Action } from '../content/reducers/serviceMessage.reducer';

export const SHOW_SERVICE_MESSAGE = 'SHOW_SERVICE_MESSAGE';
export interface ShowServiceMessageAction extends TabAction {
  type: typeof SHOW_SERVICE_MESSAGE;
  payload: {
    date: Date;
    message: string;
    action: Action | null;
  };
}
export const showServiceMessage = (
  message: string,
  tab: Tab,
  action: Action | null = null
): ShowServiceMessageAction => ({
  type: SHOW_SERVICE_MESSAGE,
  payload: { date: new Date(), message, action },
  meta: {
    tab,
    sendToTab: true
  }
});
