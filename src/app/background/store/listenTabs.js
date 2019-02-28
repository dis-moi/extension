import { tabCreated, tabRemoved, tabUpdated } from '../actions/browser/tabs';

export const onTabCreated = store => ({ id, url }) => {
  if (!url) return;

  store.dispatch(tabCreated(id, { url }));
};

export const onTabUpdated = store => (id, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const matchingUrl = changeInfo.url || tab.url; // handle reloading

    store.dispatch(tabUpdated(id, { url: matchingUrl }));
  }
};

export const onTabRemoved = store => (id) => {
  store.dispatch(tabRemoved(id));
};

export default (tabs, store) => {
  tabs.onCreated.addListener(onTabCreated(store));
  tabs.onUpdated.addListener(onTabUpdated(store));
  tabs.onRemoved.addListener(onTabRemoved(store));
};
