import findMatchingOffers from './findMatchingOffers';

let whatwgURL;

// whatwgURL is only needed to run tests in Node.
// This line prevents unglify from tripping over some ES6 in 'whatwg-url'
if(process.env.NODE_ENV !== 'production'){
  whatwgURL = require('whatwg-url');
}

const _URL = typeof URL === 'function' ? URL : whatwgURL.URL;

export default function (url, offers, drafts, prefs = {}) {
  const deactivated = prefs.deactivated || {};

  if (deactivated.deactivatedEverywhereUntil &&
    Date.now() < deactivated.deactivatedEverywhereUntil) {
    return [];
  }

  const deactivatedWebsites = deactivated.deactivatedWebsites || new Set();

  if (deactivatedWebsites.has((new _URL(url)).hostname)) {
    return [];
  }

  return findMatchingOffers(url, offers);
}