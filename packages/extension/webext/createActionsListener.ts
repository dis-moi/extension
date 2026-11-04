import { Emit } from 'libs/store/types';
import Logger from 'libs/utils/Logger';
import createMessageHandler from './createMessageHandler';

const createActionsListener = (emit: Emit) => {
  const messageHandler = createMessageHandler(emit);
  browser.runtime.onMessage.addListener(messageHandler);
  Logger.info('Listening messages ...');

  return () => {
    browser.runtime.onMessage.removeListener(messageHandler);
  };
};

export default createActionsListener;
