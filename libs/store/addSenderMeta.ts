import { PortAction, StandardAction } from 'libs/store/types';

type MessageSender = browser.runtime.MessageSender;

const addSenderMeta = <A extends StandardAction>(action: A) => (
  sender?: MessageSender
): PortAction => ({
  ...action,
  meta: { ...Object.assign({}, action?.meta), sender }
});

export default addSenderMeta;
