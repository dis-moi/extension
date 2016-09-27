import { Record, Set as ImmutableSet, Map as ImmutableMap, fromJS as immutableFromJS } from 'immutable';
import React from 'react';
import { render } from 'react-dom';
import Root from '../../../app/containers/Root';

import { createStore } from 'redux';

import rootReducer from '../../../app/content/reducers';
import alternativeFound from '../../../app/content/actions/alternatives';

import { updateDeactivatedWebsites, updateInstalledDetails } from '../../../app/content/actions/preferences';
import portCommunication from '../../../app/content/portCommunication';

const IFRAME_EXTENDED_HEIGHT = '255px';
const IFRAME_REDUCED_HEIGHT = '60px';

const EXTENSION_STATE_SHOW_LOADING = 'EXTENSION_STATE_SHOW_LOADING';
const EXTENSION_STATE_SHOW_ALTERNATIVE = 'EXTENSION_STATE_SHOW_ALTERNATIVE';

const AFTER_DOMCOMPLETE_DELAY = 5000;
const AFTER_LOADEND_DELAY = 1000;
const LOADING_SCREEN_DELAY = 4000;

/*
  LIB
*/
function createExtensionIframe(reduced, style, onLoad){
  const iframe = document.createElement('iframe');
  iframe.id = 'lmemFrame';
  iframe.width = '100%';
  iframe.height = reduced ? IFRAME_REDUCED_HEIGHT : IFRAME_EXTENDED_HEIGHT;
  iframe.style.position = 'fixed';
  iframe.style.bottom = 0;
  iframe.style.left = 0;
  iframe.style.right = 0;
  iframe.style.zIndex = 2147483647; // Max z-index value (signed 32bits integer)
  iframe.style.background = '#FDF6E3'; // UI bg color (avoid having a transparent iframe after injection)
  iframe.style.border = 'none';
  iframe.style.transition = 'height .1s';
  iframe.style.boxShadow = '0 0 15px #888';
  iframe.srcdoc = `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <link href='https://fonts.googleapis.com/css?family=Ubuntu:400,300,300italic,400italic,500,500italic,700,700italic' rel='stylesheet' type='text/css' />
      <style>` + style + `</style>
    </head>
    <body>
  </html>`;

  iframe.onload = onLoad;

  return iframe;
}


/*
  SETUP
*/

const DOMCompleteP = Promise.resolve(); // because the content script is loaded at "document_end"

const DOMCompletePlusDelayP = DOMCompleteP.then(() => {
  return new Promise(resolve => {
    const {navigationStart, domContentLoadedEventStart} = performance.timing;

    const diff = domContentLoadedEventStart - navigationStart;

    if(diff >= AFTER_DOMCOMPLETE_DELAY)
      resolve();
    else
      setTimeout(resolve, AFTER_DOMCOMPLETE_DELAY - diff);
  });
});


const LoadEndP = new Promise(resolve => {
  document.addEventListener('load', resolve);
});

const LoadEndPlusDelayP = LoadEndP.then(() => {
  return new Promise(resolve => {
    const {navigationStart, loadEventStart} = performance.timing;

    const diff = loadEventStart - navigationStart;

    if(diff >= AFTER_LOADEND_DELAY)
      resolve();
    else
      setTimeout(resolve, AFTER_LOADEND_DELAY - diff);
  });
});

// Wait for some time before showing the extension to the user in loading mode
const CanShowIframeLoadingP = Promise.race([DOMCompletePlusDelayP, LoadEndPlusDelayP]);

// User research showed that the LMEM loading screen is important so people don't 
// think the LMEM iframe is an ad.
// Wait for some time loading before showing an alternative.
const CanShowAlternativeIfAvailableP = CanShowIframeLoadingP.then(() => {
  return new Promise(resolve => {
    setTimeout(resolve, LOADING_SCREEN_DELAY);
  });
});



// create redux store
const store = createStore(
  rootReducer,
  new Record({
    open: true,
    reduced: true,
    preferenceScreenPanel: undefined, // preference screen close
    alternative: undefined,
    deactivatedWebsites: new ImmutableSet(),
    onInstalledDetails: new ImmutableMap(),
  })()
);




// reach back to background script
chrome.runtime.onConnect.addListener(function listener(portToBackground) {
  portCommunication.port = portToBackground;

  portToBackground.onMessage.addListener(msg => {
    // console.log('message from background', msg);
    const { type } = msg;


    switch (type) {
      case 'init':
        const { style, deactivatedWebsites, onInstalledDetails } = msg;

        store.dispatch(updateDeactivatedWebsites(new ImmutableSet(deactivatedWebsites)));
        store.dispatch(updateInstalledDetails(immutableFromJS(onInstalledDetails)));

        // Let the page load a bit before showing the iframe in loading mode
        CanShowIframeLoadingP
        .then(() => {

          return new Promise(resolve => {
            const iframe = createExtensionIframe(
              store.getState().get('reduced'),
              style,
              () => { resolve(iframe.contentDocument.body); }
            );

            document.body.appendChild(iframe);

            store.subscribe(() => {
              const state = store.getState();

              if (!state.get('open')) {
                iframe.remove();
              }
              else {
                iframe.height = state.get('reduced') ? IFRAME_REDUCED_HEIGHT : IFRAME_EXTENDED_HEIGHT;
              }

            });
          })
          .then(lmemContainer => {
            render(<Root store={store} />, lmemContainer);
          });

        });

        break;
      case 'alternative':
        const { alternative } = msg;
        // console.log('alternative in content', alternative);

        // Even if the alternative arrived early, let the page load a bit before
        // showing the iframe in loading mode
        CanShowAlternativeIfAvailableP
        .then(() => {
          store.dispatch(alternativeFound(alternative));
        });

        break;
      default:
        console.error('Content script: unrecognized message type from background', type, msg);
    }

  });
});






