import Tab from 'app/lmem/tab';
import forbiddenTabs from './forbiddenTabs';

export const isTabAuthorizedByPatterns = (patterns: RegExp[]) => (
  tab: Tab | chrome.tabs.Tab
) => {
  for (const pattern of patterns) {
    if (!tab.url || pattern.test(tab.url)) return false;
  }
  return true;
};

const isAuthorizedTab = isTabAuthorizedByPatterns(forbiddenTabs);

export default isAuthorizedTab;
