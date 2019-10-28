import { BaseAction } from '.';
import { ReceivedAction } from 'webext/createMessageHandler';

export const TAB_REMOVED = 'BROWSER/TAB_REMOVED';

export interface TabRemovedAction extends BaseAction {
  type: typeof TAB_REMOVED;
}
export type ReceivedTabRemovedAction = ReceivedAction & TabRemovedAction;

export const tabRemoved = (): TabRemovedAction => ({
  type: TAB_REMOVED,
  meta: { sendToBackground: true }
});
