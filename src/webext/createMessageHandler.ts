import { Action } from 'redux';
import { BaseAction } from '../app/actions';
import * as R from 'ramda';
import assocTabIfNotGiven from './assocTabIfNotGiven';
import { getOptionsUrl } from './openOptionsTab';

type MessageSender = chrome.runtime.MessageSender;
type Emit = (action: Action) => void;

const isAction = (x: unknown): x is Action =>
  typeof x === 'object' && 'type' in (x as object);

const isOptionsPage = (url: string): boolean => url.includes(getOptionsUrl());

const getTabContext = (tab?: chrome.tabs.Tab) =>
  tab && tab.url && isOptionsPage(tab.url) ? 'options' : 'content';

const addSenderToAction = <A extends BaseAction>(sender: MessageSender) =>
  R.pipe<A, A, A>(
    assocTabIfNotGiven(sender.tab),
    R.assocPath(['meta', 'from'], getTabContext(sender.tab))
  );

type StripSendMeta<A extends BaseAction = BaseAction> = (action: A) => A;
const stripSendMeta: StripSendMeta = R.pipe(
  R.dissocPath(['meta', 'sendToBackground']),
  R.dissocPath(['meta', 'sendToTab'])
);

const createMessageHandler = (emit: Emit) => (
  action: unknown,
  sender: MessageSender
) => {
  const fromText = sender.tab
    ? `tab "${sender.tab.id}": ${sender.tab.url}`
    : 'background';

  if (isAction(action)) {
    const actionWithSender = R.pipe(
      addSenderToAction(sender),
      stripSendMeta
    )(action);

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
