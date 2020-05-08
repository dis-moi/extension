import { Action } from 'redux';
import createMessageHandler from './createMessageHandler';
import Logger from '../app/utils/Logger';

type Emit = (action: Action) => void;

const createActionsListener = (emit: Emit) => {
  const messageHandler = createMessageHandler(emit);
  browser.runtime.onMessage.addListener(messageHandler);
  Logger.info('Listening actions ...');

  return () => {
    browser.runtime.onMessage.removeListener(messageHandler);
  };
};

export default createActionsListener;
