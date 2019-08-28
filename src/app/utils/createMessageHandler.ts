import { Action } from 'redux';
import { END } from 'redux-saga';
import { createErrorAction, StandardAction } from '../actions';

type MessageSender = chrome.runtime.MessageSender;

type ActionWithMeta = Action & { meta?: object };

export type SendResponse = (response: {}) => void;
const isAction = (x: unknown): x is ActionWithMeta =>
  typeof x === 'object' && 'type' in (x as object);

const createMessageHandler = (emit: (input: StandardAction | END) => void) => (
  action: unknown,
  sender: MessageSender,
  sendResponse: SendResponse
) => {
  if (isAction(action)) {
    console.info(`Received valid action "${action.type}" from:`, sender);

    const meta = action.meta || {};
    emit({ ...action, meta: { ...meta, sender } });
    sendResponse({ ...action, type: `${action.type}_RECEIVED` });
  } else {
    const error = new Error(`Received invalid action.`);
    const invalidAction = createErrorAction('INVALID_ACTION')(error, {
      action,
      sender
    });

    sendResponse(invalidAction);
  }
};

export default createMessageHandler;
