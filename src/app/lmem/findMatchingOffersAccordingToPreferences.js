
let whatwgURL;

// whatwgURL is only needed to run tests in Node.
// This line prevents Uglify from tripping over some ES6 in 'whatwg-url'
if(process.env.NODE_ENV === 'test'){
  whatwgURL = require('whatwg-url');
}

function findMatchingMatchingContexts(url, matchingContexts) {
  return matchingContexts.filter(mc => {
    return (new RegExp(mc.url_regex).test(url));
  });
}

const _URL = typeof URL === 'function' ? URL : whatwgURL.URL;

export default function (url, matchingContexts, draftMatchingContexts, prefs = {}) {
  const deactivated = prefs.deactivated || {};

  if (deactivated.deactivatedEverywhereUntil &&
    Date.now() < deactivated.deactivatedEverywhereUntil) {
    return [];
  }

  const deactivatedWebsites = deactivated.deactivatedWebsites || new Set();

  if (deactivatedWebsites.has((new _URL(url)).hostname)) {
    return [];
  }

  const matchingDraftMatchingContexts = findMatchingMatchingContexts(url, draftMatchingContexts);

  // prioritize previews over public offers
  return matchingDraftMatchingContexts.length >= 1 ?
    matchingDraftMatchingContexts : 
    findMatchingMatchingContexts(url, matchingContexts);  
}