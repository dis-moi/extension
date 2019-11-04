import { Draft } from './draft';
import { captureException } from '../utils/sentry';

export interface MatchingContext {
  noticeId: number;
  noticeUrl: string;
  urlRegex: string;
  excludeUrlRegex?: string;
  querySelector?: string;
}

export interface RestrictedContext {
  urlRegex: string;
}

export const urlMatchesContext = (
  url: string,
  { urlRegex, excludeUrlRegex }: MatchingContext | Draft
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
  allMatchingContexts: MatchingContext[] | Draft[]
): MatchingContext[] =>
  allMatchingContexts.filter((context: MatchingContext | Draft) =>
    urlMatchesContext(url, context)
  );

export function findMatchingOffersAccordingToPreferences(
  url: string,
  matchingContexts: MatchingContext[],
  drafts: Draft[]
) {
  const matchingDraftMatchingContexts = findMatchingMatchingContexts(
    url,
    drafts
  );

  // prioritize previews over public offers
  return matchingDraftMatchingContexts.length >= 1
    ? matchingDraftMatchingContexts
    : findMatchingMatchingContexts(url, matchingContexts);
}
