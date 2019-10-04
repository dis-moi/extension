import { TabAction } from '.';
import Tab from 'app/lmem/tab';

export interface BrowserActionClickedAction extends TabAction {
  type: 'BROWSER/BROWSER_ACTION_CLICKED';
  payload: {
    tab: Tab;
  };
}

export const browserActionClicked = (tab: Tab): BrowserActionClickedAction => ({
  type: 'BROWSER/BROWSER_ACTION_CLICKED',
  payload: { tab },
  meta: { tab }
});
