import { AppAction } from 'app/actions';

export type TabIdState = number | null;
export const initialState: TabIdState = null;

export default (
  state: TabIdState = initialState,
  action: AppAction
): TabIdState => {
  if (action.type === 'NOTICES_FOUND') {
    return action.meta.tab;
  }

  return state;
};
