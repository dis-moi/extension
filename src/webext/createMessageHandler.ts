import { Action } from 'redux';
import { BaseAction } from '../app/actions';
import * as R from 'ramda';
import assocTabIfNotGiven from './assocTabIfNotGiven';
import { getSettingsUrl } from './openSettingsTab';

type MessageSender = chrome.runtime.MessageSender;
type Emit = (action: Action) => void;

const isAction = (x: unknown): x is Action =>
  typeof x === 'object' && 'type' in (x as object);

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

const createMessageHandler = (emit: Emit) => (
  action: unknown,
  sender: MessageSender
) => {
  const fromText = sender.tab
    ? `tab "${sender.tab.id}": ${sender.tab.url}`
    : 'background';

  if (isAction(action)) {
    const actionWithSender = addSenderToAction(sender, action);
    emit(actionWithSender);
  } else {
    const error = new Error(`Received invalid action from ${fromText}`);
    const invalidAction = {
      type: `INVALID_ACTION`,
      payload: error,
      error: true,
      meta: { action, fromText }
    };
    emit(invalidAction);
  }
};

export default createMessageHandler;
