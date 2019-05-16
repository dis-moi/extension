import { BaseAction, ErrorAction } from '.';

export interface OpenAction extends BaseAction {
  type: 'OPEN';
}
export const open = (): OpenAction => ({ type: 'OPEN' });

export interface OpenedAction extends BaseAction {
  type: 'OPENED';
}
export const opened = (): OpenedAction => ({ type: 'OPENED' });

export interface OpenFailedAction extends ErrorAction {
  type: 'OPEN_FAILED';
}
export const openFailed = (e: Error): OpenFailedAction => ({
  type: 'OPEN_FAILED',
  payload: e,
  error: true
});

export interface CloseAction extends BaseAction {
  type: 'CLOSE';
}
export const close = (): CloseAction => ({ type: 'CLOSE' });

export interface CloseFailedAction extends ErrorAction {
  type: 'CLOSE_FAILED';
}
export const closeFailed = (e: Error): CloseFailedAction => ({
  type: 'CLOSE_FAILED',
  payload: e,
  error: true
});

export interface ClosedAction extends BaseAction {
  type: 'CLOSED';
}
export const closed = (): ClosedAction => ({ type: 'CLOSED' });
