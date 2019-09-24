import * as R from 'ramda';
import {
  TAB_CREATED,
  TAB_REMOVED,
  TAB_UPDATED
} from 'app/constants/browser/tabs';
import Tab from 'app/lmem/Tab';
import { AppAction } from 'app/actions';
import { isOptionsTabReadyAction } from '../sagas/sendContributorsToOptions.saga';

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
    case TAB_CREATED:
    case TAB_UPDATED:
      return addOrUpdateTab(action.payload.tab)(state);
    case TAB_REMOVED:
      return removeTabFromList(action.payload.tab)(state);
    case 'LISTENING_ACTIONS_READY':
      return action.meta.tab
        ? R.pipe(
            markTabReady(action.meta.tab),
            isOptionsTabReadyAction(action)
              ? markTabAsOptions(action.meta.tab)
              : R.identity
          )(state)
        : state;

    default:
      return state;
  }
}
