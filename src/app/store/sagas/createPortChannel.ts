import { eventChannel, END } from 'redux-saga';
import { Emit } from 'app/store/types';
import { createErrorAction } from 'app/actions/helpers';
import Logger from 'app/utils/Logger';
import addSenderMeta from '../addSenderMeta';
import isAction from '../isAction';

type Port = browser.runtime.Port;
type MessageSender = browser.runtime.MessageSender;

const buildFromText = (sender: MessageSender | undefined) => {
  if (sender?.tab) {
    return `tab ${sender.tab.url}`;
  } else if (sender?.id) {
    return `extension ${sender?.id}`;
  } else {
    return `unknown source`;
  }
};

export const createMessageHandler = (port: Port) => (emit: Emit) => (
  action: object
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const sender = action?.meta?.sender || port.sender;
  const fromText = buildFromText(sender);

  Logger.debug(`Received following message from ${fromText}:`);
  Logger.debug(action);

  if (isAction(action)) {
    const enhancedAction = addSenderMeta(action)(sender);
    emit(enhancedAction);
  } else {
    emit(
      createErrorAction('INVALID_ACTION')(
        new Error(`Received invalid action from ${buildFromText(port.sender)}`),
        { action, sender: port.sender }
      )
    );
  }
};

const createErrorHandler = (emit: Emit) => (p: Port) => {
  const error = p.error || browser.runtime.lastError;
  if (error) {
    // create an Error object and put it into the channel
    emit(new Error(error?.message));
  }
  emit(END);
};

const createPortChannel = (port: Port) =>
  eventChannel((emit: Emit) => {
    port.onMessage.addListener(createMessageHandler(port)(emit));
    port.onDisconnect.addListener(createErrorHandler(emit));

    // will be invoked when the saga calls `channel.close` method
    return () => {
      port.disconnect();
    };
  });

export default createPortChannel;
