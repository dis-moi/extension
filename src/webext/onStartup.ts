export default new Promise<{}>(resolve =>
  browser.runtime.onStartup.addListener(() => resolve({}))
);
