import { Action } from 'redux';
import createMessageHandler from './createMessageHandler';

type Emit = (action: Action) => void;

const createExternalMessageListener = (emit: Emit) => {
  const messageHandler = createMessageHandler(emit);
  browser.runtime.onMessageExternal.addListener(messageHandler);

  return () => {
    browser.runtime.onMessageExternal.removeListener(messageHandler);
  };
};

export default createExternalMessageListener;
