import { eventChannel } from 'redux-saga';
import isAction from './isAction';
import createAction from './createAction';

export default () => {
  return eventChannel((emit) => {
    const handleMessage = (request, sender, sendResponse) => {
      const from = sender.tab ? `tab "${sender.tab.id}": 
${sender.tab.url}` : 'background';

      if (isAction(request)) {
        console.info(`Received valid action "${request.type}" from ${from}`);
        emit(request);
        sendResponse(createAction(`${request.type}_SUCCESS`)());
      } else {
        const error = new Error(`Received invalid action from ${from}`);
        emit(error);
        sendResponse(createAction(`${request.type}_FAILURE`)(error));
        console.info('Invalid action', request);
      }


    };

    chrome.runtime.onMessage.addListener(handleMessage);

    // unsubscribe
    return () => {};
  });
};