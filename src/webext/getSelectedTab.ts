const getSelectedTab = () =>
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(([selectedTab]) => selectedTab);

export default getSelectedTab;
