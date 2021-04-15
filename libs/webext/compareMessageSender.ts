import * as R from 'ramda';
type MessageSender = browser.runtime.MessageSender;

const compareMessageSender = (
  senderA?: MessageSender,
  senderB?: MessageSender
): boolean =>
  !!senderA &&
  !!senderB &&
  (R.eqBy(R.path(['tab', 'id']), senderA, senderB) ||
    R.eqProps('id', senderA, senderB));

export default compareMessageSender;
