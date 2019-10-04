import { TabAction } from '.';
import Tab from 'app/lmem/tab';

export interface TabCreatedAction extends TabAction {
  type: 'BROWSER/TAB_CREATED';
  payload: { tab: Tab };
}
export const tabCreated = (tab: Tab): TabCreatedAction => ({
  type: 'BROWSER/TAB_CREATED',
  payload: { tab },
  meta: { tab }
});

export interface TabUpdatedAction extends TabAction {
  type: 'BROWSER/TAB_UPDATED';
  payload: { tab: Tab };
}
export const tabUpdated = (tab: Tab): TabUpdatedAction => ({
  type: 'BROWSER/TAB_UPDATED',
  payload: { tab },
  meta: { tab }
});

export interface TabRemovedAction extends TabAction {
  type: 'BROWSER/TAB_REMOVED';
  payload: { tab: Tab };
}
export const tabRemoved = (tab: Tab): TabRemovedAction => ({
  type: 'BROWSER/TAB_REMOVED',
  payload: { tab },
  meta: { tab }
});
