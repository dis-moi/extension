import { captureException } from '../utils/sentry';

export interface MatchingContext {
  noticeId: number;
  noticeUrl: string;
  urlRegex: string;
  excludeUrlRegex?: string;
  querySelector?: string;
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

export const findMatchingMatchingContexts = (
  url: string,
  allMatchingContexts: MatchingContext[]
): MatchingContext[] =>
  allMatchingContexts.filter((context: MatchingContext) =>
    urlMatchesContext(url, context)
  );

export function findMatchingOffersAccordingToPreferences(
  url: string,
  matchingContexts: MatchingContext[]
) {
  // prioritize previews over public offers
  return findMatchingMatchingContexts(url, matchingContexts);
}
