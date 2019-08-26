import { Action } from 'redux';
import createMessageHandler from './createMessageHandler';

type Emit = (action: Action) => void;

const createActionsListener = (emit: Emit) => {
  chrome.runtime.onMessage.addListener(createMessageHandler(emit));

  return () => {
    chrome.runtime.onMessage.removeListener(createMessageHandler(emit));
  };
};

export default createActionsListener;
