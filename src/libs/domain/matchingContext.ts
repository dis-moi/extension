import { Brand } from 'types';
import { sendContentScriptRequest } from 'libs/webext/contentScript';
import { captureException } from 'libs/utils/sentry';
import Tab from './tab';

export interface MatchingContext {
  id: Brand<number, 'MatchingContextId'>;
  noticeId: number;
  noticeUrl: string;
  urlRegex: string;
  excludeUrlRegex?: string;
  querySelector?: string;
  xpath?: string;
}

export interface RestrictedContext {
  urlRegex: RegExp;
}

export const toPatterns = (restrictedContexts: RestrictedContext[]) =>
  restrictedContexts.map(restrictedContext => restrictedContext.urlRegex);

export const urlMatchesContext = (
  url: string,
  { urlRegex, excludeUrlRegex }: MatchingContext
): boolean => {
  try {
    return (
      new RegExp(urlRegex, 'i').test(url) &&
      !(excludeUrlRegex && new RegExp(excludeUrlRegex, 'i').test(url))
    );
  } catch (err) {
    if (process.env.NODE_ENV !== 'test') {
      captureException(err);
    }
    return false;
  }
};

export const doesTabContentMatchExpression = async (
  tab: Tab,
  xpath: string,
  matchingContextId: MatchingContext['id']
) =>
  xpath
    ? sendContentScriptRequest<boolean>(tab, 'doesDocumentMatchExpression', [
        xpath,
        matchingContextId
      ])
    : Promise.resolve(true);

export const filterContexts = async (
  matchingContexts: MatchingContext[],
  tab: Tab
): Promise<MatchingContext[]> => {
  const responses = await Promise.all(
    matchingContexts.map((matchingContext: MatchingContext):
      | Promise<MatchingContext | false>
      | MatchingContext
      | false => {
      if (urlMatchesContext(tab.url, matchingContext)) {
        if (!matchingContext.xpath) return matchingContext;

        return doesTabContentMatchExpression(
          tab,
          matchingContext.xpath,
          matchingContext.id
        ).then((matchesContent: boolean) =>
          matchesContent ? matchingContext : false
        );
      }
      return false;
    })
  );
  return responses.filter(Boolean) as MatchingContext[];
};
