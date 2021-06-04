import { ReceivedAction } from 'libs/webext/createMessageHandler';
import Tab from 'libs/domain/tab';
import { StandardAction } from 'libs/store/types';
import { BaseAction, TabAction } from '.';

export const TAB_REMOVED = 'BROWSER/TAB_REMOVED';

export interface TabRemovedAction extends BaseAction {
  type: typeof TAB_REMOVED;
}
export type ReceivedTabRemovedAction = ReceivedAction & TabRemovedAction;

export const tabRemoved = (): TabRemovedAction => ({
  type: TAB_REMOVED,
  meta: { sendToBackground: true }
});

export const TAB_DIED = 'BROWSER/TAB_DIED';
export interface TabDiedAction extends TabAction {
  type: typeof TAB_DIED;
}

export const tabDied = (tab: Tab): TabDiedAction => ({
  type: TAB_DIED,
  meta: { tab }
});

export const TAB_ACTIVATED = 'BROWSER/TAB_ACTIVATED';
export interface TabActivatedAction extends StandardAction {
  type: typeof TAB_ACTIVATED;
  meta: { tab: Tab };
}
export const tabActivated = (tab: Tab): TabActivatedAction => ({
  type: TAB_ACTIVATED,
  meta: { tab }
});
