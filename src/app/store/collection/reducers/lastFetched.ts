import { AppAction } from 'app/actions';

export type LastFetchedState = Date | null;

export const initialState: LastFetchedState = null;

export default (REQUEST: string, SUCCESS: string, FAILURE: string) => (
  state: LastFetchedState = initialState,
  action: AppAction
): LastFetchedState => {
  switch (action.type) {
    case SUCCESS:
      return new Date();
    case FAILURE:
      return null;
    default:
      return state;
  }
};
