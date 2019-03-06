import { BaseAction } from './BaseAction';

export interface OpenAction extends BaseAction {
  type: 'OPEN';
}
export const open = (): OpenAction => ({ type: 'OPEN' });

export interface OpenedAction extends BaseAction {
  type: 'OPENED';
}
export const opened = (): OpenedAction => ({ type: 'OPENED' });

export interface CloseAction extends BaseAction {
  type: 'CLOSE';
}
export const close = (): CloseAction => ({ type: 'CLOSE' });

export interface ClosedAction extends BaseAction {
  type: 'CLOSED';
}
export const closed = (): ClosedAction => ({ type: 'CLOSED' });
