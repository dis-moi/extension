import { ContentAction } from 'app/content/actions';
import { REMOVE_TITLE, SET_TITLE } from '../../actions/ui/title';

const initialState = null;

export type TitleState = string | null;

export default (state: TitleState = initialState, action: ContentAction) => {
  switch (action.type) {
    case SET_TITLE:
      return action.payload;

    case REMOVE_TITLE:
      return null;

    default:
      return state;
  }
};
