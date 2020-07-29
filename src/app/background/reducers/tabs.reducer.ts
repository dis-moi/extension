import * as R from 'ramda';
import Tab from 'app/lmem/tab';
import {
  AppAction,
  CONTEXT_NOT_TRIGGERED,
  LISTENING_ACTIONS_READY,
  NAVIGATED_TO_URL,
  NO_NOTICES_DISPLAYED,
  NOTICES_FOUND,
  NoticesFoundAction,
  OPTIONS_TAB_OPENED,
  ReceivedNavigatedToUrlAction,
  ReceivedTabRemovedAction,
  TAB_DIED,
  TAB_REMOVED
} from 'app/actions';
import { StatefulNoticeWithContributor } from 'app/lmem/notice';
import { isOptionsPage } from 'webext/createMessageHandler';

export interface TabsState {
  [tabId: string]: Tab;
}

export const toNoticesIds = (notices: StatefulNoticeWithContributor[]) =>
  notices.map(({ id }) => id);

export const initialState: TabsState = {};

const addOrUpdateTab = (tab: Tab) => (state: TabsState): TabsState =>
  R.assoc(
    tab.id.toString(),
    {
      ...state[tab.id.toString()],
      ...tab,
      options: isOptionsPage(tab.url)
    },
    state
  );
const removeTabFromList = (tab: Tab) => (state: TabsState): TabsState =>
  R.dissoc(tab.id.toString(), state);

const markTabReady = (tab: Tab) => (state: TabsState): TabsState =>
  R.assocPath([tab.id.toString(), 'ready'], true, state);

const markTabAsOptions = (tab: Tab) => (state: TabsState): TabsState =>
  R.assocPath([tab.id.toString(), 'options'], true, state);

export default function(state = initialState, action: AppAction) {
  switch (action.type) {
    case OPTIONS_TAB_OPENED:
      return addOrUpdateTab(action.payload)(state);
    case NAVIGATED_TO_URL:
      return addOrUpdateTab((action as ReceivedNavigatedToUrlAction).meta.tab)(
        state
      );
    case TAB_REMOVED:
    case TAB_DIED:
      return removeTabFromList((action as ReceivedTabRemovedAction).meta.tab)(
        state
      );
    case LISTENING_ACTIONS_READY:
      const tab = action.meta.tab as Tab;
      return tab
        ? R.pipe(
            addOrUpdateTab(tab),
            markTabReady(tab),
            action.meta.from === 'options' && tab
              ? markTabAsOptions(tab)
              : R.identity
          )(state)
        : state;
    case NOTICES_FOUND:
      return addOrUpdateTab({
        ...(action as NoticesFoundAction).meta.tab,
        notices: toNoticesIds(action.payload.notices)
      })(state);
    case CONTEXT_NOT_TRIGGERED:
    case NO_NOTICES_DISPLAYED:
      return addOrUpdateTab({
        ...action.meta.tab,
        notices: []
      })(state);
    default:
      return state;
  }
}
