import { ContentScriptRequest, isRequest } from 'libs/webext/contentScript';
import doesDocumentMatchExpression from 'libs/utils/doesDocumentMatchExpression';

export const availableMethods: Record<string, (...args: any[]) => unknown> = {
  doesDocumentMatchExpression
};

export const handleRequest = ({
  method,
  parameters
}: ContentScriptRequest): Promise<unknown> => {
  if (method in availableMethods) {
    return Promise.resolve(availableMethods[method](...parameters));
  }

  throw new Error(`Method \`${method}\` is not available.
Available methods are \`[${Object.keys(availableMethods).join(', ')}]\`.`);
};

export { isRequest };
