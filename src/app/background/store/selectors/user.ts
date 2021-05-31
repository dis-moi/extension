import { UserState } from 'app/background/store/reducers/user';

export const getUserId = (state: { user: UserState }) => state.user;
