import { AppAction } from 'app/actions';
import Tab from 'app/lmem/Tab';

export const initialState = null;

export type TabState = Tab | null;

export default (
  state: TabState = initialState,
  action: AppAction
): TabState => {
  if (action.type === 'NOTICES_FOUND') {
    return action.meta.tab;
  }

  return state;
};
