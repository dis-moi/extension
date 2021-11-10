import icons from '../../../manifest/icons';
import greyIcons from '../../../manifest/icons-grey';
import { getFacet } from '../facets/getFacet';

export interface BadgeTheme {
  backgroundColor: {
    hasAllNoticesRead: string;
    hasUnreadNotices: string;
  };
}

export const resetBadge = (tabId?: number) => {
  browser.browserAction.setBadgeText({ text: '', tabId });
  // FIXME : @Jalil
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  browser.browserAction.setIcon({ path: greyIcons[getFacet()] });
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
  browser.browserAction.setIcon({ path: icons[getFacet()], tabId });

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
