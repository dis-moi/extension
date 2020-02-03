export default new Promise<{}>(resolve =>
  chrome.runtime.onStartup.addListener(() => resolve({}))
);
