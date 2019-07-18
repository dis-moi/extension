import { BaseAction } from '../../../actions';

const initialState = null;

export type TitleState = string | null;

export default (state: TitleState = initialState, action: BaseAction) => {
  switch (action.type) {
    case 'UI/SET_TITLE':
      return action.payload;

    case 'UI/REMOVE_TITLE':
      return null;

    default:
      return state;
  }
};
