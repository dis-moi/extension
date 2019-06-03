import {
  Notice,
  StatefulNotice,
  isIgnored,
  shouldNoticeBeShown
} from '../../lmem/notice';
import { BackgroundState } from '../reducers';

export const getPrefs = (state: BackgroundState) => state.prefs;

export const getInstallationDetails = (state: BackgroundState) =>
  getPrefs(state).installationDetails;
export const getDismissed = (state: BackgroundState) =>
  getPrefs(state).dismissedNotices;
export const getLiked = (state: BackgroundState) =>
  getPrefs(state).likedNotices;
export const getDisliked = (state: BackgroundState) =>
  getPrefs(state).dislikedNotices;
export const getRead = (state: BackgroundState) => getPrefs(state).readNotices;

export const getInitialContent = (state: BackgroundState) => ({
  installationDetails: getInstallationDetails(state)
});

export const getAddStateToNotice = (state: BackgroundState) => {
  const dismissed = getDismissed(state);
  const liked = getLiked(state);
  const disliked = getDisliked(state);
  const read = getRead(state);

  console.log('dismissed', dismissed);
  return (notice: Notice): StatefulNotice => ({
    ...notice,
    state: {
      dismissed: dismissed.includes(notice.id),
      liked: liked.includes(notice.id),
      disliked: disliked.includes(notice.id),
      read: read.includes(notice.id)
    }
  });
};

export const getNoticesToDisplay = (notices: Notice[]) => (
  state: BackgroundState
): StatefulNotice[] =>
  notices.map(getAddStateToNotice(state)).filter(shouldNoticeBeShown);

export const getDismissedNotices = (notices: Notice[]) => (
  state: BackgroundState
): StatefulNotice[] =>
  notices
    .map(getAddStateToNotice(state))
    .filter(notice => notice.state.dismissed);

export const getIgnoredNotices = (notices: Notice[]) => (
  state: BackgroundState
): StatefulNotice[] =>
  notices.map(getAddStateToNotice(state)).filter(isIgnored);
