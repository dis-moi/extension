import { Action } from 'redux';
import { ActionMeta } from './index';

export interface BaseAction extends Action {
  payload?: {};
  meta?: ActionMeta;
}

export type TabAction = BaseAction & {
  meta: ActionMeta & {
    tab: number;
  };
};
