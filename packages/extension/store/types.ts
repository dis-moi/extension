import { Action } from 'redux';
import MessageSender = browser.runtime.MessageSender;

export interface StandardAction extends Action {
  payload?: unknown;
  meta?: unknown;
  error?: true;
}

export interface MetaWithReceiver {
  receiver?: MessageSender;
}

export interface ReceiverAction extends StandardAction {
  meta: MetaWithReceiver;
}

export interface MetaWithSender {
  sender?: MessageSender;
}

export interface SenderAction extends StandardAction {
  meta: MetaWithSender;
}

export type PortAction = ReceiverAction | SenderAction;

export type Emit = (action: Action | Error) => void;
