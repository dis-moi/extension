import { tabCreated, tabRemoved, tabUpdated } from 'app/actions/tabsLifecycle';
import { Store } from 'redux';

export const onTabCreated = (store: Store) => (tab: chrome.tabs.Tab) => {
  if (!tab.url || !tab.id) return;

  store.dispatch(tabCreated({ id: tab.id, url: tab.url }));
};

export const onTabUpdated = (store: Store) => (
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tabInfo: chrome.tabs.Tab
) => {
  if (changeInfo.status === 'loading') {
    const matchingUrl = changeInfo.url || tabInfo.url; // handle reloading
    if (!matchingUrl) return;

    store.dispatch(tabUpdated({ id: tabId, url: matchingUrl }));
  }
};

export const onTabRemoved = (store: Store) => (tabId: number) => {
  store.dispatch(tabRemoved({ id: tabId, url: '' }));
};

export default (store: Store) => {
  chrome.tabs.onCreated.addListener(onTabCreated(store));
  chrome.tabs.onUpdated.addListener(onTabUpdated(store));
  chrome.tabs.onRemoved.addListener(onTabRemoved(store));
};
