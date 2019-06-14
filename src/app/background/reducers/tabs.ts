import {
  TAB_CREATED,
  TAB_REMOVED,
  TAB_UPDATED
} from '../../constants/browser/tabs';
import { AppAction } from 'app/actions';
import * as R from 'ramda';
import Tab from 'app/lmem/Tab';

export interface TabsState {
  [tabId: string]: Tab;
}

export const initialState: TabsState = {};

export default function(state = initialState, action: AppAction) {
  switch (action.type) {
    case TAB_CREATED:
    case TAB_UPDATED:
      return { ...state, [action.payload.tab.id]: action.payload.tab };

    case TAB_REMOVED:
      return R.dissoc<TabsState>(action.payload.tab.id.toString(), state);

    default:
      return state;
  }
}
