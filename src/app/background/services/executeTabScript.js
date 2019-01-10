export default code => tab => new Promise((resolve) => {
  chrome.tabs.executeScript(tab, {
    code,
    runAt: 'document_end'
  }, (result) => {
    resolve(result);
  });
});