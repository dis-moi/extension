import { BaseAction } from '.';

export interface LoginAction extends BaseAction {
  type: 'LOGIN';
  payload: string;
}

export const login = (userId: string): LoginAction => ({
  type: 'LOGIN',
  payload: userId
});
