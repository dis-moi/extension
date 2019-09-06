const sendMessageToBackground = (message: unknown): void => {
  chrome.runtime.sendMessage(message);
};

export default sendMessageToBackground;
