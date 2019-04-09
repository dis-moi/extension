import { TabAction } from '.';

export interface BrowserActionClickedAction extends TabAction {
  type: 'BROWSER/BROWSER_ACTION_CLICKED';
  payload: {
    tab: number;
  };
}

export const browserActionClicked = (
  tab: number
): BrowserActionClickedAction => ({
  type: 'BROWSER/BROWSER_ACTION_CLICKED',
  payload: { tab },
  meta: { tab, sendToTab: true }
});
