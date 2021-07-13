import { AppAction } from 'libs/store/actions';
import { SHOW_NEWS } from '../../../../libs/store/actions/news.actions';

export interface NewsState {
  lastShownDate?: null | Date;
  message?: null | string;
}

export const initialState: NewsState = {
  lastShownDate: null,
  message: null
};

export default (
  state: NewsState = initialState,
  action: AppAction
): NewsState => {
  switch (action.type) {
    case SHOW_NEWS: {
      return action.payload;
    }
    default:
      return state;
  }
};
