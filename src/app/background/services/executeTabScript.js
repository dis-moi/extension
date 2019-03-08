export default code => (tab, url) => new Promise((resolve) => {
  if (url.startsWith('http')) {
    chrome.tabs.executeScript(tab, {
      code,
      runAt: 'document_end'
    }, (result) => {
      resolve(result);
    });
  }
});
