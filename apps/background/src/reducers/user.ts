import { AppAction } from 'src/app/actions';
import { LOGIN } from '../../../../libs/store/actions/user';

export type UserState = string | null;

const initialState = null;

export default (
  state: UserState = initialState,
  action: AppAction
): UserState => {
  switch (action.type) {
    case LOGIN:
      return action.payload;

    default:
      return state;
  }
};
