const extensionId = chrome
  ? process.env.CHROME_EXTENSION_ID
  : process.env.FIREFOX_EXTENSION_ID;

export default extensionId;
