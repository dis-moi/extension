import { tabCreated, tabRemoved, tabUpdated } from 'app/actions/tabsLifecycle';
import { Store } from 'redux';

export const onTabCreated = (store: Store) => ({
  id,
  url
}: chrome.tabs.Tab) => {
  if (!url || !id) return;

  store.dispatch(tabCreated(id, url));
};

export const onTabUpdated = (store: Store) => (
  tab: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tabInfo: chrome.tabs.Tab
) => {
  if (changeInfo.status === 'loading') {
    const matchingUrl = changeInfo.url || tabInfo.url; // handle reloading
    if (!matchingUrl) return;

    store.dispatch(tabUpdated(tab, matchingUrl));
  }
};

export const onTabRemoved = (store: Store) => (tab: number) => {
  store.dispatch(tabRemoved(tab));
};

export default (store: Store) => {
  chrome.tabs.onCreated.addListener(onTabCreated(store));
  chrome.tabs.onUpdated.addListener(onTabUpdated(store));
  chrome.tabs.onRemoved.addListener(onTabRemoved(store));
};
