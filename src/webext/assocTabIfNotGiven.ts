import * as R from 'ramda';
import { Action } from 'redux';

type ActionWithTab<A> = A & { meta: { tab: chrome.tabs.Tab } };

const assocTabIfNotGiven = (tab?: chrome.tabs.Tab) => <A extends Action>(
  action: A
): ActionWithTab<A> =>
  R.over(
    R.lensPath(['meta', 'tab']),
    R.defaultTo(tab),
    action
  ) as ActionWithTab<A>;

export default assocTabIfNotGiven;
