import { AppAction } from 'libs/store/actions';

export type FetchingState = number;

export const initialState = 0;

export default (REQUEST: string, SUCCESS: string, FAILURE: string) => (
  state: FetchingState = initialState,
  action: AppAction
): FetchingState => {
  switch (action.type) {
    case REQUEST:
      return state + 1;
    case SUCCESS:
    case FAILURE:
      return state - 1;
    default:
      return state;
  }
};
