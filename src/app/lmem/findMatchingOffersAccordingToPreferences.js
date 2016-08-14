import whatwgURL from 'whatwg-url';

import findMatchingOffers from './findMatchingOffers';

const _URL = typeof URL === 'function' ? URL : whatwgURL.URL;

export default function (url, offers, prefs = {}) {
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