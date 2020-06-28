import { StandardAction } from 'app/store/types';
import { ActionMeta } from 'app/actions';

type Port = browser.runtime.Port;

export const CONNECT = 'EXTENSION/PORT_CONNECT';
export interface ConnectAction extends StandardAction {
  type: typeof CONNECT;
  payload: Port | undefined;
}
export const connect = (port?: Port, meta?: ActionMeta): ConnectAction => ({
  type: CONNECT,
  payload: port,
  meta
});
export const CONNECTED = 'EXTENSION/PORT_CONNECTED';
export interface ConnectedAction extends StandardAction {
  type: typeof CONNECTED;
}
export const connected = (meta?: ActionMeta): ConnectedAction => ({
  type: CONNECTED,
  meta
});
export const DISCONNECTED = 'EXTENSION/PORT_DISCONNECTED';
export interface DisconnectedAction extends StandardAction {
  type: typeof DISCONNECTED;
}
export const disconnected = (error: Error): DisconnectedAction => ({
  type: DISCONNECTED,
  payload: error,
  error: true
});

export type ConnectionAction =
  | ConnectAction
  | ConnectedAction
  | DisconnectedAction;
