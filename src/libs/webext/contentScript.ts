import Tab from 'libs/lmem/tab';

export type ContentScriptRequestMethod = string;
export type ContentScriptRequestParameters = unknown[];

export interface ContentScriptRequest {
  method: ContentScriptRequestMethod;
  parameters: ContentScriptRequestParameters;
}
export type ContentScriptResponse<ResponseType> = ResponseType;

export const sendContentScriptRequest = <ExpectedResponseType>(
  tab: Tab,
  method: ContentScriptRequestMethod,
  parameters: ContentScriptRequestParameters
): Promise<ExpectedResponseType> =>
  browser.tabs.sendMessage(tab.id, {
    method,
    parameters
  });

export const isRequest = (
  message: unknown
): message is ContentScriptRequest => {
  return typeof message === 'object' && 'method' in (message as object);
};
