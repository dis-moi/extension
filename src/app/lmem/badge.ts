import { StatefulNotice, isUnread } from './notice';
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
    chrome.browserAction.setIcon({ path: icons });

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
          ? backgroundColor.hasUnreadNotices
          : backgroundColor.hasAllNoticesRead,
      tabId
    });
  } else {
    resetBadge(tabId);
  }
};
