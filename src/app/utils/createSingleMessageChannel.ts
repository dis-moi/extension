import { eventChannel } from 'redux-saga';
import { Action } from 'redux';
import MessageSender = chrome.runtime.MessageSender;

type SendResponse = ({}) => void;

const isAction = (x: any): x is Action => typeof x === 'object' && 'type' in x;

export default () => {
  return eventChannel(emit => {
    const handleMessage = (
      action: any,
      sender: MessageSender,
      sendResponse: SendResponse
    ) => {
      const from = sender.tab
        ? `tab "${sender.tab.id}": ${sender.tab.url}`
        : 'background';

      if (isAction(action)) {
        console.info(`Received valid action "${action.type}" from ${from}`);
        emit(action);
        sendResponse({ ...action, type: `${action.type}_RECEIVED` });
      } else {
        const error = new Error(`Received invalid action from ${from}`);
        const invalidAction = {
          type: `INVALID_ACTION`,
          payload: error,
          error: true,
          meta: { action, from }
        };
        emit(invalidAction);

        if (action.type) {
          sendResponse({ ...invalidAction, type: `${action.type}_FAILURE` });
        } else {
          sendResponse(invalidAction);
        }
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  });
};
