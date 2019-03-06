export interface MatchingContext {
  recommendation_url: string;
  url_regex: string;
  exclude_url_regex?: string;
}

export const urlMatchesContext = (
  url: string,
  { url_regex, exclude_url_regex }: MatchingContext
): boolean => {
  try {
    return (
      new RegExp(url_regex, 'i').test(url) &&
      !(exclude_url_regex && new RegExp(exclude_url_regex, 'i').test(url))
    );
  } catch (err) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('MatchingContext ignored:', err);
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
  matchingContexts: MatchingContext[],
  draftMatchingContexts: MatchingContext[]
) {
  const matchingDraftMatchingContexts = findMatchingMatchingContexts(
    url,
    draftMatchingContexts
  );

  // prioritize previews over public offers
  return matchingDraftMatchingContexts.length >= 1
    ? matchingDraftMatchingContexts
    : findMatchingMatchingContexts(url, matchingContexts);
}
