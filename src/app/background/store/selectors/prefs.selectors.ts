import { createSelector } from 'reselect';
import * as R from 'ramda';
import {
  Notice,
  StatefulNotice,
  isIgnored,
  shouldNoticeBeShown
} from 'app/lmem/notice';
import { PrefsState } from '../reducers/prefs.reducer';

export interface StateWithPrefs {
  prefs: PrefsState;
}

const getPrefs = (state: StateWithPrefs) => {
  console.log('state.prefs', state.prefs);
  return state.prefs;
};

export const areTosAccepted = createSelector(
  getPrefs,
  prefs => prefs.tosAccepted
);

export const getDismissed = createSelector(
  [getPrefs],
  R.prop('dismissedNotices')
);
export const getLiked = createSelector(
  [getPrefs],
  R.prop('likedNotices')
);
export const getDisliked = createSelector(
  [getPrefs],
  R.prop('dislikedNotices')
);
export const getRead = createSelector(
  [getPrefs],
  R.prop('readNotices')
);

export const getAddStateToNotice = createSelector(
  [getDismissed, getLiked, getDisliked, getRead],
  (dismissed, liked, disliked, read) => (notice: Notice): StatefulNotice => ({
    ...notice,
    state: {
      dismissed: dismissed.includes(notice.id),
      liked: liked.includes(notice.id),
      disliked: disliked.includes(notice.id),
      read: read.includes(notice.id)
    }
  })
);

interface PropsWithNotices {
  notices: Notice[];
}
const getNoticesFromProps = (state: object, props: PropsWithNotices) =>
  props.notices;

export const getNoticesWithState = createSelector(
  [getAddStateToNotice, getNoticesFromProps],
  (addNoticeState, notices) => notices.map(addNoticeState)
);

export const getNoticesToDisplay = createSelector(
  [getNoticesWithState],
  R.filter(shouldNoticeBeShown)
);

export const getIgnoredNotices = createSelector(
  [getNoticesWithState],
  R.filter(isIgnored)
);
