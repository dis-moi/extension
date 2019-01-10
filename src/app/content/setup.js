export const AFTER_DOMCOMPLETE_DELAY = 2000;
export const AFTER_LOADEND_DELAY = 1000;
export const LOADING_SCREEN_DELAY = 4000;

export const DOMCompleteP = Promise.resolve(); // because the content script is loaded at "document_end"

export const DOMCompletePlusDelayP = DOMCompleteP.then(() => {
  return new Promise((resolve) => {
    const {navigationStart, domContentLoadedEventStart} = performance.timing;

    const diff = domContentLoadedEventStart - navigationStart;

    if(diff >= AFTER_DOMCOMPLETE_DELAY) resolve();
    else setTimeout(resolve, AFTER_DOMCOMPLETE_DELAY - diff);
  });
});

export const LoadEndP = new Promise((resolve) => {
  document.addEventListener('load', resolve);
});

export const LoadEndPlusDelayP = LoadEndP.then(() => {
  return new Promise((resolve) => {
    const {navigationStart, loadEventStart} = performance.timing;

    const diff = loadEventStart - navigationStart;

    if(diff >= AFTER_LOADEND_DELAY) resolve();
    else setTimeout(resolve, AFTER_LOADEND_DELAY - diff);
  });
});

// Wait for some time before showing the extension to the user in loading mode
export const CanShowIframeLoadingP = process.env.NODE_ENV === 'development'
  ? Promise.resolve()
  : Promise.race([DOMCompletePlusDelayP, LoadEndPlusDelayP]);

// User research showed that the LMEM loading screen is important so people don't
// think the LMEM iframe is an ad.
// Wait for some time loading before showing a recommendation.
export const CanShowRecommendationIfAvailableP = process.env.NODE_ENV === 'development'
  ? Promise.resolve() // otherwise the delay is annoying when developing
  : CanShowIframeLoadingP.then(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, LOADING_SCREEN_DELAY);
    });
  });