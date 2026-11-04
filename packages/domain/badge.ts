const icons = {
  '16': 'img/logo/dismoi/16x16.png',
  '48': 'img/logo/dismoi/48x48.png',
  '128': 'img/logo/dismoi/128x128.png',
};

const greyIcons = {
  '16': 'img/logo/dismoi/grey/16x16.png',
  '48': 'img/logo/dismoi/grey/48x48.png',
  '128': 'img/logo/dismoi/grey/128x128.png',
};

export interface BadgeTheme {
  backgroundColor: {
    hasAllNoticesRead: string;
    hasUnreadNotices: string;
  };
}

export const resetBadge = (tabId?: number) => {
  browser.action.setBadgeText({ text: '', tabId });
  browser.action.setIcon({ path: greyIcons });
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
  tabId?: number,
): void => {
  browser.action.setIcon({ path: icons, tabId });

  const { backgroundColor } = badgeTheme;

  browser.action.setBadgeText({
    text: noticesNumber > 0 ? noticesNumber.toString() : '',
    tabId,
  });
  browser.action.setBadgeBackgroundColor({
    color:
      unreadNoticesNumber > 0
        ? backgroundColor.hasUnreadNotices
        : backgroundColor.hasAllNoticesRead,
    tabId,
  });
};
