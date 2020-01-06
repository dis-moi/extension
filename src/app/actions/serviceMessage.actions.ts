import { TabAction } from './';
import Tab from 'app/lmem/tab';
import ServiceMessage from 'app/lmem/ServiceMessage';

export const SHOW_SERVICE_MESSAGE = 'SHOW_SERVICE_MESSAGE';
export interface ShowServiceMessageAction extends TabAction {
  type: typeof SHOW_SERVICE_MESSAGE;
  payload: ServiceMessage;
}
export const showServiceMessage = (
  serviceMessage: ServiceMessage,
  tab: Tab
): ShowServiceMessageAction => ({
  type: SHOW_SERVICE_MESSAGE,
  payload: { ...serviceMessage, lastShownDate: new Date() },
  meta: {
    tab,
    sendToTab: true
  }
});
