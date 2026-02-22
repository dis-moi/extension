import Tab from 'libs/domain/tab';

export const disable = (tab: Tab) => {
  if (tab.id) {
    browser.action.disable(tab.id);
  }
};
