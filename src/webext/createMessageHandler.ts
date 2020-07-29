import { Action } from 'redux';
import * as R from 'ramda';
import { BaseAction, NAVIGATED_TO_URL } from 'app/actions';
import assocMetaIfNotGiven from './assocMetaIfNotGiven';
import { getOptionsUrl } from './openOptionsTab';
import { Emit } from 'app/store/types';
import isAction from 'app/store/isAction';
import { createErrorAction } from 'app/actions/helpers';
import { Level } from 'app/utils/Logger';

type MessageSender = browser.runtime.MessageSender;

export const isOptionsPage = (url: string): boolean =>
  url.includes(getOptionsUrl());

type PossibleOriginInBackground = 'options' | 'content';

/**
 * If `from` is specified by sender, we keep it,
 * otherwise we try to detect it from URL.
 * @param action
 * @param tab
 */
const getTabFrom = (
  action: Action,
  tab?: browser.tabs.Tab
): PossibleOriginInBackground =>
  R.pipe<
    Action,
    PossibleOriginInBackground | undefined,
    PossibleOriginInBackground
  >(
    R.path(['meta', 'from']),
    R.defaultTo<PossibleOriginInBackground>(
      tab && tab.url && isOptionsPage(tab.url) ? 'options' : 'content'
    )
  )(action);

/**
 * Chrome keeps the `url` property in `sender.tab` but Firefox does not,
 * without the `tabs` permission, but still gives it in `sender.url` for some reason.
 * Edit 2020: Firefox doesn't always give the right `url`, however in one special scenario
 * we can get the right URL from our action `payload`.
 */
const getUrlFromActionOrSender = (
  action: Action,
  sender: MessageSender
): string | undefined => {
  if (action.type === NAVIGATED_TO_URL) {
    return R.path(['payload', 'url'])(action) as string | undefined;
  } else if (sender.tab && sender.tab.url) {
    return sender.tab.url;
  } else {
    return sender.url;
  }
};

const getTabFromSender = (
  action: Action,
  sender: MessageSender
): browser.tabs.Tab => {
  return {
    ...(sender.tab as browser.tabs.Tab),
    url: getUrlFromActionOrSender(action, sender)
  };
};

type ActionWithTab = Action & { meta: { tab: browser.tabs.Tab } };

const addSenderToAction = <A extends BaseAction>(sender: MessageSender) =>
  R.pipe<A, ActionWithTab, ReceivedAction>(
    action =>
      assocMetaIfNotGiven<'tab', browser.tabs.Tab>(
        'tab',
        getTabFromSender(action, sender)
      )(action),
    action =>
      assocMetaIfNotGiven<'from', PossibleOriginInBackground>(
        'from',
        getTabFrom(action, sender.tab)
      )(action)
  );

const stripSendMeta = R.pipe<ReceivedAction, ReceivedAction, ReceivedAction>(
  R.dissocPath(['meta', 'sendToBackground']),
  R.dissocPath(['meta', 'sendToTab'])
);

export interface ReceivedAction extends Action {
  meta: {
    tab: browser.tabs.Tab;
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
    const invalidAction = createErrorAction('INVALID_ACTION')(error, {
      action,
      fromText,
      severity: Level.INFO
    });
    emit(invalidAction);
  }
};

export default createMessageHandler;
