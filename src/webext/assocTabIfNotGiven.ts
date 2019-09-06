import * as R from 'ramda';
import { Action } from 'redux';

const assocTabIfNotGiven = (tab?: chrome.tabs.Tab) => <A extends Action>(
  action: A
): A => R.over(R.lensPath(['meta', 'tab']), R.defaultTo(tab), action);

export default assocTabIfNotGiven;
