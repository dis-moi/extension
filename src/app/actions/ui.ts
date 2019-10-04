import { CloseCause } from 'app/lmem/ui';
import Tab from 'app/lmem/tab';
import { BaseAction, ErrorAction, TabAction } from '.';

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
  payload: { cause }
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
  payload: { cause }
});

export const TOGGLE_UI = 'TOGGLE_UI';
export interface ToggleUIAction extends TabAction {
  type: typeof TOGGLE_UI;
  payload: { closeCause: CloseCause };
}

export const toggleUI = (tab: Tab, closeCause: CloseCause): ToggleUIAction => ({
  type: TOGGLE_UI,
  payload: { closeCause },
  meta: { tab, sendToTab: true }
});
