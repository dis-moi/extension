import { StatefulNotice, isMarkedUnread } from './notice';

export interface BadgeTheme {
  backgroundColor: {
    markedRead: string;
    markedUnread: string;
  };
}

export const resetBadge = (tabId?: number) =>
  chrome.browserAction.setBadgeText({ text: '', tabId });

/**
 * Update text and background color of the badge based on the number of notices.
 *
 * @param {StatefulNotice[]} notices
 * @param {BadgeTheme} badgeTheme
 * @param {number} tabId Limits the change to when a particular tab is selected.
 *
 * @return {void}
 */
export const updateBadge = (
  notices: StatefulNotice[],
  badgeTheme: BadgeTheme,
  tabId?: number
): void => {
  if (notices.length > 0) {
    const markedUnreadNotices = notices.filter(isMarkedUnread);
    const { backgroundColor } = badgeTheme;

    chrome.browserAction.setBadgeText({
      text:
        markedUnreadNotices.length > 0
          ? markedUnreadNotices.length.toString()
          : notices.length.toString(),
      tabId
    });
    chrome.browserAction.setBadgeBackgroundColor({
      color:
        markedUnreadNotices.length > 0
          ? backgroundColor.markedUnread
          : backgroundColor.markedRead,
      tabId
    });
  } else {
    resetBadge(tabId);
  }
};
