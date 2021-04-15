import { UserState } from '../reducers/user';

export const getUserId = (state: { user: UserState }) => state.user;
