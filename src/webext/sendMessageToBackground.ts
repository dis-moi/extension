/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { serialize } from './serializer';

const sendMessageToBackground = (message: unknown) =>
  // @ts-ignore
  browser.runtime.sendMessage(serialize(message));

export default sendMessageToBackground;
