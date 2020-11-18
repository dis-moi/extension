import { captureException } from '../utils/sentry';
import Tab from './tab';
import { sendContentScriptRequest } from 'webext/contentScript';

export interface MatchingContext {
  id: number;
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

export const filterContextsMatchingUrl = (
  url: string,
  matchingContexts: MatchingContext[]
) =>
  matchingContexts.filter((context: MatchingContext) =>
    urlMatchesContext(url, context)
  );

export const doesTabContentMatchExpression = async (tab: Tab, xpath?: string) =>
  xpath
    ? sendContentScriptRequest<boolean>(tab, 'doesDocumentMatchExpression', [
        xpath
      ])
    : Promise.resolve(true);

export const filterContextsMatchingTabContent = async (
  tab: Tab,
  matchingContexts: MatchingContext[]
) => {
  const responses = await Promise.all(
    matchingContexts.map(({ xpath }: MatchingContext) =>
      doesTabContentMatchExpression(tab, xpath)
    )
  );

  return matchingContexts.filter((_, index) => responses[index]);
};
