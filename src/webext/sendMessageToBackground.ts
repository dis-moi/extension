const sendMessageToBackground = (message: any): void => {
  chrome.runtime.sendMessage(message);
};

export default sendMessageToBackground;
