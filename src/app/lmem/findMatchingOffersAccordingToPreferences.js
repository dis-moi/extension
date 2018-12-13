import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';

let whatwgURL;

// whatwgURL is only needed to run tests in Node.
// This line prevents Uglify from tripping over some ES6 in 'whatwg-url'
if (process.env.NODE_ENV === 'test') {
  whatwgURL = require('whatwg-url'); // eslint-disable-line
}

function findMatchingMatchingContexts(url, matchingContexts) {
  return matchingContexts.filter(({ url_regex: urlRegex, exclude_url_regex: excludeUrlRegex }) => {
    try {
      return new RegExp(urlRegex, 'i').test(url)
        && !(excludeUrlRegex && new RegExp(excludeUrlRegex, 'i').test(url));
    }
    catch (err) {
      if (process.env.NODE_ENV !== 'test') console.error('MatchingContext ignored:', err);
      return false;
    }
  });
}

const _URL = typeof URL === 'function' ? URL : whatwgURL.URL;

export default function (url, matchingContexts, draftMatchingContexts, prefs = new ImmutableMap()) {
  const deactivated = prefs.get('deactivated') || new ImmutableMap();

  if (deactivated.has('everywhereUntil') && Date.now() < deactivated.get('everywhereUntil')) return [];

  const deactivatedWebsites = deactivated.get('deactivatedWebsites') || new ImmutableSet();

  if (deactivatedWebsites.has((new _URL(url)).hostname)) return [];

  const matchingDraftMatchingContexts = findMatchingMatchingContexts(url, draftMatchingContexts);

  // prioritize previews over public offers
  return matchingDraftMatchingContexts.length >= 1
    ? matchingDraftMatchingContexts 
    : findMatchingMatchingContexts(url, matchingContexts);  
}