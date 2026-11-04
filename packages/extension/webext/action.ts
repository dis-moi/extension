import Tab from '@dismoi/domain/tab';

export const disable = (tab: Tab) => {
  if (tab.id) {
    browser.action.disable(tab.id);
  }
};
