import icons from '../../../manifest/icons';
import greyIcons from '../../../manifest/icons-grey';

export interface BadgeTheme {
  backgroundColor: {
    hasAllNoticesRead: string;
    hasUnreadNotices: string;
  };
}

export const resetBadge = (tabId?: number) => {
  chrome.browserAction.setBadgeText({ text: '', tabId });
  chrome.browserAction.setIcon({ path: greyIcons });
};

/**
 * Update text and background color of the badge based on the number of notices.
 *
 * @param {number} noticesNumber
 * @param {number} unreadNoticesNumber
 * @param {BadgeTheme} badgeTheme
 * @param {number} tabId Limits the change to when a particular tab is selected.
 *
 * @return {void}
 */
export const updateBadge = (
  noticesNumber: number,
  unreadNoticesNumber: number,
  badgeTheme: BadgeTheme,
  tabId?: number
): void => {
  chrome.browserAction.setIcon({ path: icons, tabId });
  if (noticesNumber > 0) {
    const { backgroundColor } = badgeTheme;

    chrome.browserAction.setBadgeText({
      text: noticesNumber.toString(),
      tabId
    });
    chrome.browserAction.setBadgeBackgroundColor({
      color:
        unreadNoticesNumber > 0
          ? backgroundColor.hasUnreadNotices
          : backgroundColor.hasAllNoticesRead,
      tabId
    });
  }
};
