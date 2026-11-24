import { fullUrlRegex } from './UrlPattern';

// Goes through fullUrlRegex, the composition the V3 reads use: a tester
// that drifts from what is served reassures wrongly.

export type TargetingVerdict =
  | { readonly state: 'empty' }
  | { readonly state: 'invalid'; readonly message: string }
  | { readonly state: 'matches'; readonly pattern: string }
  | { readonly state: 'does-not-match'; readonly pattern: string };

export const tryTargeting = (
  domains: ReadonlyArray<string>,
  pathPattern: string,
  exampleUrl: string,
): TargetingVerdict => {
  if (pathPattern.trim() === '' || exampleUrl.trim() === '') {
    return { state: 'empty' };
  }

  // An empty domain would produce an empty alternative, which matches
  // everything: the pattern would stop targeting anything at all.
  const kept = domains
    .map((domain) => domain.trim())
    .filter((domain) => domain !== '');

  const pattern = fullUrlRegex(
    {
      domainsSets: [],
      domainNames: kept.map((name) => ({
        name,
        path: null,
        aliases: [],
      })),
    },
    pathPattern,
  );

  try {
    return new RegExp(pattern).test(exampleUrl)
      ? { state: 'matches', pattern }
      : { state: 'does-not-match', pattern };
  } catch (error) {
    return {
      state: 'invalid',
      message: error instanceof Error ? error.message : String(error),
    };
  }
};
