import { BaseAction, ErrorAction } from '.';
import { CloseCause } from '../lmem/ui';

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
  payload: { cause: CloseCause };
}
export const close = (cause: CloseCause): CloseAction => ({
  type: 'CLOSE',
  payload: { cause },
  meta: { sendToBackground: true }
});

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
  payload: { cause: CloseCause };
}
export const closed = (cause: CloseCause): ClosedAction => ({
  type: 'CLOSED',
  payload: { cause },
  meta: { sendToBackground: true }
});
