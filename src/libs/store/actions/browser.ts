import Tab from 'libs/domain/tab';
import { TabAction } from '.';

export const ACTION_CLICKED = 'BROWSER/ACTION_CLICKED';
export interface BrowserActionClickedAction extends TabAction {
  type: typeof ACTION_CLICKED;
  payload: {
    tab: Tab;
  };
}

export const browserActionClicked = (tab: Tab): BrowserActionClickedAction => ({
  type: ACTION_CLICKED,
  payload: { tab },
  meta: { tab }
});
