const sendMessageToBackground = (message: any) =>
  new Promise(resolve => {
    chrome.runtime.sendMessage(message, response => resolve(response));
  });

export default sendMessageToBackground;
