import { Action } from 'redux';
import * as R from 'ramda';
import Tab from 'app/lmem/tab';
import { BaseAction } from 'app/actions';
import assocTabIfNotGiven from './assocTabIfNotGiven';
import { getOptionsUrl } from './openOptionsTab';

type MessageSender = chrome.runtime.MessageSender;
type Emit = (action: Action) => void;

const isAction = (x: unknown): x is Action =>
  typeof x === 'object' && 'type' in (x as object);

const isOptionsPage = (url: string): boolean => url.includes(getOptionsUrl());

type PossibleOriginInBackground = 'options' | 'content';

const getTabContext = (tab?: chrome.tabs.Tab) =>
  tab && tab.url && isOptionsPage(tab.url) ? 'options' : 'content';

type SetMetaFrom<A> = (
  a: A
) => A & { meta: { from: PossibleOriginInBackground } };
const setMetaFrom = <A>(from: PossibleOriginInBackground) =>
  R.assocPath(['meta', 'from'], from) as SetMetaFrom<A>;

type ActionWithTab = Action & { meta: { tab: chrome.tabs.Tab & Tab } };
const addSenderToAction = <A extends BaseAction>(sender: MessageSender) =>
  R.pipe<A, ActionWithTab, ReceivedAction>(
    assocTabIfNotGiven(sender.tab),
    setMetaFrom(getTabContext(sender.tab))
  );

const stripSendMeta = R.pipe<ReceivedAction, ReceivedAction, ReceivedAction>(
  R.dissocPath(['meta', 'sendToBackground']),
  R.dissocPath(['meta', 'sendToTab'])
);

export interface ReceivedAction extends Action {
  meta: {
    tab: chrome.tabs.Tab & Tab;
    from: PossibleOriginInBackground;
  };
}

const createMessageHandler = (emit: Emit) => (
  action: unknown,
  sender: MessageSender
) => {
  const fromText = sender.tab
    ? `tab "${sender.tab.id}": ${sender.tab.url}`
    : 'background';

  if (isAction(action)) {
    const actionWithSender: ReceivedAction = R.pipe(
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
