import Tab from '../../domain/tab';
import { TabAction } from './index';

export const SHOW_NEWS = 'SHOW_NEWS';

interface ShowNewsPayload {
  message: string;
  lastShownDate?: null | Date;
}
export interface ShowNewsAction extends TabAction {
  type: typeof SHOW_NEWS;
  payload: ShowNewsPayload;
}

export const showNews = (
  payload: ShowNewsPayload,
  tab: Tab
): ShowNewsAction => {
  return {
    type: SHOW_NEWS,
    payload,
    meta: {
      sendToTab: true,
      tab
    }
  };
};
