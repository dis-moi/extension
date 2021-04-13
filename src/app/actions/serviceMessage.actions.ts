import Tab from 'app/lmem/tab';
import ServiceMessage from 'app/lmem/ServiceMessage';
import { TabAction } from './';

export const SERVICE_MESSAGE = 'SERVICE_MESSAGE';
export interface ShowServiceMessageAction extends TabAction {
  type: typeof SERVICE_MESSAGE;
  payload: ServiceMessage;
}
export const showServiceMessage = (
  serviceMessage: ServiceMessage,
  tab: Tab
): ShowServiceMessageAction => ({
  type: SERVICE_MESSAGE,
  payload: { ...serviceMessage, lastShownDate: new Date() },
  meta: {
    tab,
    sendToTab: true
  }
});

export const clearServiceMessage = (tab: Tab): ShowServiceMessageAction => ({
  type: SERVICE_MESSAGE,
  payload: {
    messages: []
  },
  meta: {
    tab,
    sendToTab: true
  }
});
