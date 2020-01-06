import {
  LocationChangeAction,
  LocationChangePayload
} from 'connected-react-router';
import { CloseCause } from 'app/lmem/ui';
import Tab from 'app/lmem/tab';
import { BaseAction, ErrorAction, TabAction } from '.';

export const OPEN = 'OPEN';
export interface OpenAction extends BaseAction {
  type: typeof OPEN;
}
export const open = (tab?: Tab): OpenAction => ({
  type: OPEN,
  meta: {
    sendToTab: !!tab,
    tab
  }
});

export const OPENED = 'OPENED';
export interface OpenedAction extends BaseAction {
  type: typeof OPENED;
}
export const opened = (): OpenedAction => ({ type: OPENED });

export const OPEN_FAILED = 'OPEN_FAILED';
export interface OpenFailedAction extends ErrorAction {
  type: typeof OPEN_FAILED;
}
export const openFailed = (e: Error): OpenFailedAction => ({
  type: OPEN_FAILED,
  payload: e,
  error: true
});

export const CLOSE = 'CLOSE';
export interface CloseAction extends BaseAction {
  type: typeof CLOSE;
  payload: { cause: CloseCause };
}
export const close = (cause: CloseCause): CloseAction => ({
  type: CLOSE,
  payload: { cause },
  meta: { sendToBackground: true }
});

export const CLOSE_FAILED = 'CLOSE_FAILED';
export interface CloseFailedAction extends ErrorAction {
  type: typeof CLOSE_FAILED;
}
export const closeFailed = (e: Error): CloseFailedAction => ({
  type: CLOSE_FAILED,
  payload: e,
  error: true
});

export const CLOSED = 'CLOSED';
export interface ClosedAction extends BaseAction {
  type: typeof CLOSED;
  payload: { cause: CloseCause };
}
export const closed = (cause: CloseCause): ClosedAction => ({
  type: CLOSED,
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

export const LOCATION_CHANGED = 'LOCATION_CHANGED';
export interface LocationChangedAction extends BaseAction {
  type: typeof LOCATION_CHANGED;
  payload: LocationChangePayload;
}
export const locationChanged = ({
  payload
}: LocationChangeAction): LocationChangedAction => ({
  type: LOCATION_CHANGED,
  payload,
  meta: { sendToBackground: true }
});
