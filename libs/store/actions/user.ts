import { BaseAction } from './index';

export const LOGIN = 'LOGIN';
export interface LoginAction extends BaseAction {
  type: typeof LOGIN;
  payload: string;
}

export const login = (userId: string): LoginAction => ({
  type: LOGIN,
  payload: userId
});
