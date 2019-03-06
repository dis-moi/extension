import { eventChannel } from 'redux-saga';
import { Action } from 'redux';

interface MessageSender {
  id?: string;
  tab?: chrome.tabs.Tab;
  url?: string;
  nativeApplication?: string;
  tlsChannelId?: string;
}

type SendResponse = ({}) => void;

const isAction = (x: any): x is Action => typeof x === 'object' && 'type' in x;

export default () => {
  return eventChannel(emit => {
    const handleMessage = (
      action: {},
      sender: MessageSender,
      sendResponse: SendResponse
    ) => {
      const senderType = sender.tab
        ? `tab "${sender.tab.id}": ${sender.tab.url}`
        : 'background';

      if (isAction(action)) {
        console.info(
          `Received valid action "${action.type}" from ${senderType}`
        );
        emit(action);
        sendResponse({ ...action, type: `${action.type}_RECEIVED` });
      } else {
        const error = new Error(`Received invalid action from ${senderType}`);
        emit(error);
        sendResponse({ ...action, type: `RECEIVE_MESSAGE_FAILURE`, error });
        console.info('Invalid action', action);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  });
};
