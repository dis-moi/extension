import * as R from 'ramda';
import {
  TAB_CREATED,
  TAB_REMOVED,
  TAB_UPDATED
} from 'app/constants/browser/tabs';
import Tab from 'app/lmem/Tab';
import { AppAction } from 'app/actions';

export interface TabsState {
  [tabId: string]: Tab;
}

export const initialState: TabsState = {};

const addTabToList = (tab: Tab) => (state: TabsState): TabsState =>
  R.assoc(tab.id.toString(), tab, state);
const removeTabFromList = (tab: Tab) => (state: TabsState): TabsState =>
  R.dissoc(tab.id.toString(), state);

const markTabReady = (tab: Tab) => (state: TabsState): TabsState =>
  R.assocPath([tab.id.toString(), 'ready'], true, state);

export default function(state = initialState, action: AppAction) {
  switch (action.type) {
    case TAB_CREATED:
    case TAB_UPDATED:
      return addTabToList(action.payload.tab)(state);
    case TAB_REMOVED:
      return removeTabFromList(action.payload.tab)(state);
    case 'LISTENING_ACTIONS_READY':
      return action.meta.tab ? markTabReady(action.meta.tab)(state) : state;

    default:
      return state;
  }
}
