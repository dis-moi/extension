import {
  Notice,
  EnhancedNotice,
  isIgnored,
  warnIfNoticeInvalid,
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

export const getInitialContent = (state: BackgroundState) => ({
  installationDetails: getInstallationDetails(state)
});

export const getNoticeEnhancer = (state: BackgroundState) => {
  const dismissed = getDismissed(state);
  const liked = getLiked(state);
  const disliked = getDisliked(state);

  return (notice: Notice) => ({
    ...notice,
    dismissed: dismissed.includes(notice.id),
    liked: liked.includes(notice.id),
    disliked: disliked.includes(notice.id),
    valid: warnIfNoticeInvalid(notice)
  });
};

export const getNoticesToDisplay = (notices: EnhancedNotice[]) => (
  state: BackgroundState
): EnhancedNotice[] =>
  notices.map(getNoticeEnhancer(state)).filter(shouldNoticeBeShown);

export const getDismissedNotices = (notices: EnhancedNotice[]) => (
  state: BackgroundState
): EnhancedNotice[] =>
  notices.map(getNoticeEnhancer(state)).filter(notice => notice.dismissed);

export const getIgnoredNotices = (notices: EnhancedNotice[]) => (
  state: BackgroundState
): EnhancedNotice[] => notices.map(getNoticeEnhancer(state)).filter(isIgnored);
