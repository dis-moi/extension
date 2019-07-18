import { Action } from 'redux';
import { END } from 'redux-saga';
import { createErrorAction, StandardAction } from '../actions';

import MessageSender = chrome.runtime.MessageSender;

export type SendResponse = ({}) => void;
const isAction = (x: any): x is Action => typeof x === 'object' && 'type' in x;

const createMessageHandler = (emit: (input: StandardAction | END) => void) => (
  action: any,
  sender: MessageSender,
  sendResponse: SendResponse
) => {
  if (isAction(action)) {
    console.info(`Received valid action "${action.type}" from:`, sender);
    // @ts-ignore
    emit({ ...action, meta: { ...action.meta, sender } });
    sendResponse({ ...action, type: `${action.type}_RECEIVED` });
  } else {
    const error = new Error(`Received invalid action.`);
    const invalidAction = createErrorAction('INVALID_ACTION')(error, {
      action,
      sender
    });

    if (action.type) {
      sendResponse({ ...invalidAction, type: `${action.type}_FAILURE` });
    } else {
      sendResponse(invalidAction);
    }
  }
};

export default createMessageHandler;
