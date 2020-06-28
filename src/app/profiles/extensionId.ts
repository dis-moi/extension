import createMessageSender from '../../webext/createMessageSender';

const extensionId =
  typeof chrome === 'undefined'
    ? process.env.FIREFOX_EXTENSION_ID
    : process.env.CHROME_EXTENSION_ID;

export const extensionMessageSender = createMessageSender({ id: extensionId });

export default extensionId;
