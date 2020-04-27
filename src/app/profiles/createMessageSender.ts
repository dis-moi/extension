type MessageSender = browser.runtime.MessageSender;

const createMessageSender = ({
  tab,
  frameId,
  id,
  tlsChannelId
}: MessageSender) => ({
  tab,
  frameId,
  id,
  url: tab?.url,
  tlsChannelId
});

export default createMessageSender;
