import Tab from 'libs/lmem/tab';
import { TabAction } from '.';

export const BROWSER_ACTION_CLICKED = 'BROWSER/BROWSER_ACTION_CLICKED';
export interface BrowserActionClickedAction extends TabAction {
  type: typeof BROWSER_ACTION_CLICKED;
  payload: {
    tab: Tab;
  };
}

export const browserActionClicked = (tab: Tab): BrowserActionClickedAction => ({
  type: BROWSER_ACTION_CLICKED,
  payload: { tab },
  meta: { tab }
});
