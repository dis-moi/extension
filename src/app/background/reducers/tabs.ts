import {
  TAB_CREATED,
  TAB_UPDATED,
  TAB_REMOVED
} from '../../constants/browser/tabs';
import { AppAction } from 'app/actions';
import * as R from 'ramda';

export interface TabsState {
  [tab: string]: string;
}

export const initialState: TabsState = {};

export default function(state = initialState, action: AppAction) {
  switch (action.type) {
    case TAB_CREATED:
      return { ...state, [action.payload.tab]: action.payload.url };

    case TAB_UPDATED:
      return { ...state, [action.payload.tab]: action.payload.url };

    case TAB_REMOVED:
      return R.dissoc<TabsState>(action.payload.tab.toString(), state);

    default:
      return state;
  }
}
