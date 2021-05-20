import icons from '../../../manifest/icons';
import greyIcons from '../../../manifest/icons-grey';

export interface BadgeTheme {
  backgroundColor: {
    hasAllNoticesRead: string;
    hasUnreadNotices: string;
    hasFailed: string;
  };
}

export const resetBadge = (tabId?: number) => {
  browser.browserAction.setBadgeText({ text: '', tabId });
  browser.browserAction.setIcon({ path: greyIcons, tabId });
};

export const failBadge = (badgeTheme: BadgeTheme, tabId?: number) => {
  browser.browserAction.setBadgeText({ text: '🔴️', tabId });
  browser.browserAction.setBadgeBackgroundColor({
    color: badgeTheme.backgroundColor.hasFailed
  });
  browser.browserAction.setIcon({ path: greyIcons, tabId });
  browser.browserAction.setTitle({
    title: 'Problème de communication avec le backend'
  });
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
  browser.browserAction.setIcon({ path: icons, tabId });

  const { backgroundColor } = badgeTheme;

  browser.browserAction.setBadgeText({
    text: noticesNumber > 0 ? noticesNumber.toString() : '',
    tabId
  });
  browser.browserAction.setBadgeBackgroundColor({
    color:
      unreadNoticesNumber > 0
        ? backgroundColor.hasUnreadNotices
        : backgroundColor.hasAllNoticesRead,
    tabId
  });
};
