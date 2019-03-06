import { TabAction } from '../BaseAction';

export interface TabCreatedAction extends TabAction {
  type: 'BROWSER/TAB_CREATED';
  payload: { tab: number; url: string };
}
export const tabCreated = (tab: number, url: string): TabCreatedAction => ({
  type: 'BROWSER/TAB_CREATED',
  payload: { tab, url },
  meta: { tab }
});

export interface TabUpdatedAction extends TabAction {
  type: 'BROWSER/TAB_UPDATED';
  payload: { tab: number; url: string };
}
export const tabUpdated = (tab: number, url: string): TabUpdatedAction => ({
  type: 'BROWSER/TAB_UPDATED',
  payload: { tab, url },
  meta: { tab }
});

export interface TabRemovedAction extends TabAction {
  type: 'BROWSER/TAB_REMOVED';
  payload: { tab: number };
}
export const tabRemoved = (tab: number): TabRemovedAction => ({
  type: 'BROWSER/TAB_REMOVED',
  payload: { tab },
  meta: { tab }
});
