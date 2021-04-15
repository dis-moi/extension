import Logger from '../../../utils/Logger';
import { eventChannel } from 'redux-saga';
import { StandardAction } from 'libs/store/types';
import isStandardAction from 'libs/store/isStandardAction';

export type StandardActionMatcher = (action: StandardAction) => boolean;

export const createMessageHandler = (
  emit: (action: StandardAction) => void
) => (targetOrigin = '*') => (actionMatcher: StandardActionMatcher) => (
  event: MessageEvent
) => {
  if (isStandardAction(event.data) && targetOrigin === event.origin) {
    if (actionMatcher(event.data)) {
      emit(event.data);
    } else {
      Logger.debug("Didn't match:", event.data);
    }
  } else {
    Logger.debug('Invalid action:', event.data);
  }
};

const createActionChannel = (
  window: Window,
  targetOrigin = '*',
  actionMatcher: StandardActionMatcher
) => {
  return eventChannel<StandardAction>(emit => {
    const messageHandler = createMessageHandler(emit)(targetOrigin)(
      actionMatcher
    );
    const unsubscribe = () => {
      window.removeEventListener('message', messageHandler);
    };

    window.addEventListener('message', messageHandler);

    return unsubscribe;
  });
};

export default createActionChannel;
