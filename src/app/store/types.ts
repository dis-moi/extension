import { Action } from 'redux';
import MessageSender = browser.runtime.MessageSender;

export interface StandardAction extends Action {
  payload?: unknown;
  meta?: unknown;
  error?: true;
}

export interface ReceiverAction extends StandardAction {
  meta: {
    receiver?: MessageSender;
  };
}

export interface SenderAction extends StandardAction {
  meta: {
    sender?: MessageSender;
  };
}

export type PortAction = ReceiverAction | SenderAction;

export type Emit = (action: Action | Error) => void;
