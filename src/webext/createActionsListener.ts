import { Action } from 'redux';
import createMessageHandler from './createMessageHandler';

type Emit = (action: Action) => void;

const createActionsListener = (emit: Emit) => {
  const messageHandler = createMessageHandler(emit);
  chrome.runtime.onMessage.addListener(messageHandler);

  return () => {
    chrome.runtime.onMessage.removeListener(messageHandler);
  };
};

export default createActionsListener;
