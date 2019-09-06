import { Action } from 'redux';
import createMessageHandler from './createMessageHandler';

type Emit = (action: Action) => void;

const createExternalMessageListener = (emit: Emit) => {
  const messageHandler = createMessageHandler(emit);
  chrome.runtime.onMessageExternal.addListener(messageHandler);

  return () => {
    chrome.runtime.onMessageExternal.removeListener(messageHandler);
  };
};

export default createExternalMessageListener;
