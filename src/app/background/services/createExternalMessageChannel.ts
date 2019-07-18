import { eventChannel } from 'redux-saga';
import createMessageHandler from '../../utils/createMessageHandler';

const createExternalMessageChannel = () => {
  return eventChannel(emit => {
    const handleMessage = createMessageHandler(emit);
    chrome.runtime.onMessageExternal.addListener(handleMessage);

    // unsubscribe
    return () => {
      chrome.runtime.onMessageExternal.removeListener(handleMessage);
    };
  });
};

export default createExternalMessageChannel;
