import { LOGIN } from '../../actions/user';
import { AppAction } from 'app/actions';

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
