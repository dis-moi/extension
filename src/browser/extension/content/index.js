import { Record, Set as ImmutableSet } from 'immutable';
import React from 'react';
import { render } from 'react-dom';
import Root from '../../../app/containers/Root';

import { createStore } from 'redux';

import rootReducer from '../../../app/content/reducers';
import alternativeFound from '../../../app/content/actions/alternatives';

import updateDeactivatedWebsites from '../../../app/content/actions/preferences';
import portCommunication from '../../../app/content/portCommunication';

const IFRAME_EXTENDED_HEIGHT = '255px';
const IFRAME_REDUCED_HEIGHT = '60px';

// create redux store
const store = createStore(
  rootReducer,
  new Record({
    open: true,
    reduced: false,
    preferenceScreenPanel: undefined, // preference screen close
    alternative: undefined,
    deactivatedWebsites: new ImmutableSet()
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
        const { style, deactivatedWebsites } = msg;
        const reduced = store.getState().get('reduced');
        const lmemContentContainerP = new Promise(resolve => {
          const iframe = document.createElement('iframe');
          iframe.id = 'lmemFrame';
          iframe.width = '100%';
          iframe.height = reduced ? IFRAME_REDUCED_HEIGHT : IFRAME_EXTENDED_HEIGHT;
          iframe.style.position = 'fixed';
          iframe.style.bottom = 0;
          iframe.style.left = 0;
          iframe.style.right = 0;
          iframe.style.zIndex = 2147483647; // Max z-index value (signed 32bits integer)
          iframe.style.background = '#FDF6E3'; // UI background color (avoid having a transparent iframe after injection)
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

          iframe.onload = function () {
            resolve(iframe.contentDocument.body);
          };
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
        });

        store.dispatch(updateDeactivatedWebsites(new ImmutableSet(deactivatedWebsites)));

        lmemContentContainerP.then(lmemContentContainer => {
          render(
            <Root store={store} />,
            lmemContentContainer
          );
        });
        break;
      case 'alternative':
        const { alternative } = msg;

        // console.log('alternative in content', alternative);
        store.dispatch(alternativeFound(alternative));
        break;
      default:
        console.error('Content script: unrecognized message type from background', type, msg);
    }

  });
});






