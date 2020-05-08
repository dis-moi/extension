const sendMessageToBackground = (message: unknown) =>
  browser.runtime.sendMessage(message);

export default sendMessageToBackground;
