import { AppAction } from 'libs/store/actions';

export type FetchedState = boolean;

export const initialState = false;

export default (REQUEST: string, SUCCESS: string, FAILURE: string) => (
  state: FetchedState = initialState,
  action: AppAction
): FetchedState => {
  switch (action.type) {
    case REQUEST:
      return false;
    case SUCCESS:
    case FAILURE:
      return true;
    default:
      return state;
  }
};
