import { createSelector } from 'reselect';
import * as R from 'ramda';
import { isIgnored, Notice, shouldNoticeBeShown } from 'app/lmem/notice';
import Tab from 'app/lmem/tab';
import { getAddStateToNotice } from './prefs.selectors';
import { getTabs } from './tabs';

interface PropsWithTab {
  tab: Tab;
}
const getTabFromProps = (state: object, props: PropsWithTab) => {
  console.log('props.tab', props.tab);
  return props.tab;
};

const getTabNotices = createSelector(
  [getTabs, getTabFromProps],
  (tabs, tab) => R.path([tab.id, 'notices'], tabs)
);

export const getTabNoticesWithState = createSelector(
  [getAddStateToNotice, getTabNotices],
  (addNoticeState, notices) => {
    console.log('getTabNoticesWithState', addNoticeState, notices);
    console.log(
      R.when(R.isArrayLike, R.map(addNoticeState), notices as Notice[])
    );
    return R.when(R.isArrayLike, R.map(addNoticeState), notices as Notice[]);
  }
);

export const getTabNoticesToDisplay = createSelector(
  [getTabNoticesWithState],
  R.filter(shouldNoticeBeShown)
);

export const getTabIgnoredNotices = createSelector(
  [getTabNoticesWithState],
  R.filter(isIgnored)
);
