import { StatefulNotice, isUnread } from './notice';

export interface BadgeTheme {
  backgroundColor: {
    read: string;
    unread: string;
  };
}

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
    const unreadNotices = notices.filter(isUnread);
    const { backgroundColor } = badgeTheme;

    chrome.browserAction.setBadgeText({
      text:
        unreadNotices.length > 0
          ? unreadNotices.length.toString()
          : notices.length.toString(),
      tabId
    });
    chrome.browserAction.setBadgeBackgroundColor({
      color:
        unreadNotices.length > 0
          ? backgroundColor.unread
          : backgroundColor.read,
      tabId
    });
  } else {
    resetBadge(tabId);
  }
};

export const resetBadge = (tabId?: number) =>
  chrome.browserAction.setBadgeText({ text: '', tabId });
