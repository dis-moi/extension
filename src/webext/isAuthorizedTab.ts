import Tab from 'app/lmem/tab';
import forbiddenTabs from './forbiddenTabs';

const isAuthorizedTab = (tab: Tab | chrome.tabs.Tab) => {
  for (const pattern of forbiddenTabs) {
    if (!tab.url || pattern.test(tab.url)) return false;
  }
  return true;
};

export default isAuthorizedTab;
