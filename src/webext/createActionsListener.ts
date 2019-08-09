import MessageSender = chrome.runtime.MessageSender;
import { Action } from 'redux';
import * as R from 'ramda';
import { BaseAction } from '../app/actions';
import { getSettingsUrl } from './openSettingsTab';
import assocTabIfNotGiven from './assocTabIfNotGiven';

type SendResponse = ({}) => void;

const isAction = (x: any): x is Action => typeof x === 'object' && 'type' in x;

type Emit = (action: Action) => void;

const isSettingsPage = (url: string): boolean => url.includes(getSettingsUrl());

const getTabContext = (tab?: chrome.tabs.Tab) =>
  tab && tab.url && isSettingsPage(tab.url) ? 'settings' : 'content';

const addSenderToAction = <A extends BaseAction>(
  sender: MessageSender,
  action: A
): A =>
  R.pipe<A, A, A>(
    assocTabIfNotGiven(sender.tab),
    R.assocPath(['meta', 'from'], getTabContext(sender.tab))
  )(action);

const createActionsListener = (emit: Emit) => {
  const handleMessage = (
    action: any,
    sender: MessageSender,
    sendResponse: SendResponse
  ) => {
    const fromText = sender.tab
      ? `tab "${sender.tab.id}": ${sender.tab.url}`
      : 'background';

    if (isAction(action)) {
      console.info(`Received valid action "${action.type}" from ${fromText}`);
      const actionWithSender = addSenderToAction(sender, action);
      emit(actionWithSender);
      sendResponse({ ...action, type: `${action.type}_RECEIVED` });
    } else {
      const error = new Error(`Received invalid action from ${fromText}`);
      const invalidAction = {
        type: `INVALID_ACTION`,
        payload: error,
        error: true,
        meta: { action, fromText }
      };
      emit(invalidAction);

      if (action.type) {
        // Question from Jalil : How can we get here ?
        sendResponse({ ...invalidAction, type: `${action.type}_FAILURE` });
      } else {
        sendResponse(invalidAction);
      }
    }
  };

  chrome.runtime.onMessage.addListener(handleMessage);

  return () => {
    chrome.runtime.onMessage.removeListener(handleMessage);
  };
};

export default createActionsListener;
