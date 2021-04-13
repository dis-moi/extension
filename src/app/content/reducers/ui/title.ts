import { REMOVE_TITLE, SET_TITLE } from '../../actions/ui/title';
import { AppAction } from 'app/actions';

const initialState = null;

export type TitleState = string | null;

export default (state: TitleState = initialState, action: AppAction) => {
  switch (action.type) {
    case SET_TITLE:
      return action.payload;

    case REMOVE_TITLE:
      return null;

    default:
      return state;
  }
};
