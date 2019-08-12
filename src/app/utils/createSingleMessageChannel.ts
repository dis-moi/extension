import { eventChannel } from 'redux-saga';
import createMessageHandler from './createMessageHandler';

export default () => {
  return eventChannel(emit => {
    const handleMessage = createMessageHandler(emit);

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  });
};
