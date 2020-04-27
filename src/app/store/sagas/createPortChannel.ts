/* eslint-disable no-console */
import { eventChannel, END } from 'redux-saga';
import { StandardAction, Emit, PortAction } from 'app/store/types';
import { createErrorAction } from 'app/actions/helpers';
import isAction from '../isAction';

type Port = browser.runtime.Port;
type MessageSender = browser.runtime.MessageSender;

const createActionEnhancer = (port: Port) => (
  action: StandardAction
): PortAction => ({
  ...action,
  meta: {
    ...Object.assign({}, action.meta),
    sender: port.sender
  }
});

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
  const fromText = buildFromText(port.sender);
  console.log(`Received following message from ${fromText}:`);
  console.log(action);

  if (isAction(action)) {
    const enhanceAction = createActionEnhancer(port);
    const enhancedAction = enhanceAction(action);
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
