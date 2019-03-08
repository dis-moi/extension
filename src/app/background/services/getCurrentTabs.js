export default () => new Promise(resolve => chrome.tabs.query(
  {
    active: true,
    currentWindow: true,
  },
  tabs => resolve(tabs),
));