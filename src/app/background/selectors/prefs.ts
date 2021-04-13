import { createSelector } from 'reselect';
import {
  NoticeWithContributor,
  isIgnored,
  shouldNoticeBeShown,
  StatefulNoticeWithContributor
} from 'app/lmem/notice';
import { BackgroundState } from '../reducers';

export const getPrefs = (state: BackgroundState) => state.prefs;

export const areTosAccepted = createSelector([], () => true);

export const getDismissed = (state: BackgroundState) =>
  getPrefs(state).dismissedNotices;
export const getLiked = (state: BackgroundState) =>
  getPrefs(state).likedNotices;
export const getDisliked = (state: BackgroundState) =>
  getPrefs(state).dislikedNotices;
export const getRead = (state: BackgroundState) => getPrefs(state).readNotices;

export const getAddStateToNotice = (state: BackgroundState) => {
  const dismissed = getDismissed(state);
  const liked = getLiked(state);
  const disliked = getDisliked(state);
  const read = getRead(state);

  return (notice: NoticeWithContributor): StatefulNoticeWithContributor => ({
    ...notice,
    state: {
      dismissed: dismissed.includes(notice.id),
      liked: liked.includes(notice.id),
      disliked: disliked.includes(notice.id),
      read: read.includes(notice.id)
    }
  });
};

export const getNoticesToDisplay = (notices: NoticeWithContributor[]) => (
  state: BackgroundState
): StatefulNoticeWithContributor[] =>
  notices.map(getAddStateToNotice(state)).filter(shouldNoticeBeShown);

export const getDismissedNotices = (notices: NoticeWithContributor[]) => (
  state: BackgroundState
): StatefulNoticeWithContributor[] =>
  notices
    .map(getAddStateToNotice(state))
    .filter(notice => notice.state.dismissed);

export const getIgnoredNotices = (notices: NoticeWithContributor[]) => (
  state: BackgroundState
): StatefulNoticeWithContributor[] =>
  notices.map(getAddStateToNotice(state)).filter(isIgnored);
