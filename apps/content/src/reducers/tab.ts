import { AppAction, NOTICES_FOUND } from 'src/app/actions';
import Tab from 'libs/lmem/tab';

export const initialState = null;

export type TabState = Tab | null;

export default (
  state: TabState = initialState,
  action: AppAction
): TabState => {
  if (action.type === NOTICES_FOUND) {
    return action.meta.tab;
  }

  return state;
};
