import * as R from 'ramda';
import Tab from 'app/lmem/tab';
import {
  NAVIGATED_TO_URL,
  TAB_REMOVED,
  AppAction,
  ReceivedNavigatedToUrlAction,
  ReceivedTabRemovedAction
} from 'app/actions';

export interface TabsState {
  [tabId: string]: Tab;
}

export const initialState: TabsState = {};

const addOrUpdateTab = (tab: Tab) => (state: TabsState): TabsState =>
  R.assoc(tab.id.toString(), R.merge(state[tab.id.toString()], tab), state);
const removeTabFromList = (tab: Tab) => (state: TabsState): TabsState =>
  R.dissoc(tab.id.toString(), state);

const markTabReady = (tab: Tab) => (state: TabsState): TabsState =>
  R.assocPath([tab.id.toString(), 'ready'], true, state);

const markTabAsOptions = (tab: Tab) => (state: TabsState): TabsState =>
  R.assocPath([tab.id.toString(), 'options'], true, state);

export default function(state = initialState, action: AppAction) {
  switch (action.type) {
    case 'OPTIONS_TAB_OPENED':
      return markTabAsOptions(action.payload)(state);
    case NAVIGATED_TO_URL:
      return addOrUpdateTab((action as ReceivedNavigatedToUrlAction).meta.tab)(
        state
      );
    case TAB_REMOVED:
      return removeTabFromList((action as ReceivedTabRemovedAction).meta.tab)(
        state
      );
    case 'LISTENING_ACTIONS_READY':
      return action.meta.tab
        ? R.pipe(
            addOrUpdateTab(action.meta.tab),
            markTabReady(action.meta.tab),
            action.meta.from === 'options' && action.meta.tab
              ? markTabAsOptions(action.meta.tab)
              : R.identity
          )(state)
        : state;

    default:
      return state;
  }
}
