import { BaseAction } from '../../actions';

export const MESSAGE_EVENT_TRIGGERED = 'MESSAGE_EVENT_TRIGGERED';

export interface MessageEventTriggeredAction extends BaseAction {
  type: typeof MESSAGE_EVENT_TRIGGERED;
  payload: MessageEvent;
}

export const messageEventTriggered = (
  messageEvent: MessageEvent
): MessageEventTriggeredAction => ({
  type: MESSAGE_EVENT_TRIGGERED,
  payload: messageEvent
});
