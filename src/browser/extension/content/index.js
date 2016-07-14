import { Record } from 'immutable';
import React from 'react';
import { render } from 'react-dom';
import Root from 'app/containers/Root';
import configureStore from 'app/store/configureStore';

import Alternative from 'app/components/Alternatives';
import { STYLES_URL, IMAGES_URL } from 'app/constants/assetsUrls';

import { createStore } from 'redux';

import rootReducer from '../../../app/content/reducers';
import alternativeFound from '../../../app/content/actions/alternatives';
import { REDUCE_ALTERNATIVE_IFRAME, EXTEND_ALTERNATIVE_IFRAME } from '../../../app/constants/ActionTypes.js';

const IFRAME_EXTENDED_HEIGHT = '255px';
const IFRAME_REDUCED_HEIGHT = '60px';

// create redux store
const store = createStore(
  rootReducer,
  new Record({
    reduced: false,
    alternative: undefined
  })(),
);

// reach back to background script
chrome.runtime.onConnect.addListener(function listener(portToBackground) {
  portToBackground.onMessage.addListener(msg => {
    // console.log('message from background', msg);
    const {type} = msg;

    switch(type){
      case 'init': 
        const {style} = msg;
        const reduced = store.getState().get('reduced');
        const lmemContentContainerP = new Promise(resolve => {
        const iframe = document.createElement('iframe');
        iframe.id = 'lmemFrame';
        iframe.width = '100%';
        iframe.height = reduced ? IFRAME_REDUCED_HEIGHT : IFRAME_EXTENDED_HEIGHT;
        iframe.style.position = 'fixed';
        iframe.style.bottom = '0px';
        iframe.style.left = '0px';
        iframe.style.right = '0px';
        iframe.style.zIndex = '999999999';
        iframe.srcdoc = `<!doctype html>
          <html>
            <head>
              <meta charset="utf-8">
              <link href='https://fonts.googleapis.com/css?family=Ubuntu:400,300,300italic,400italic,500,500italic,700,700italic' rel='stylesheet' type='text/css' />
              <style>`+style+`</style>
            </head>
            <body style="background: white;">
          </html>`;
        iframe.onload = function() {
          resolve(iframe.contentDocument.body)
        };
        document.body.appendChild(iframe);

        store.subscribe(() => {
          iframe.height = store.getState().get('reduced') ? IFRAME_REDUCED_HEIGHT : IFRAME_EXTENDED_HEIGHT;
        })
      })

      lmemContentContainerP.then( lmemContentContainer => {
        render(
          <Root store={store} />,
          lmemContentContainer
        );
      });
        break;
      case 'alternative':
        const {alternative} = msg;

        // console.log('alternative in content', alternative);
        store.dispatch(alternativeFound(alternative));
        break;
      default:
        console.error('Content script: unrecognized message type from background', type, msg)
    }

  });
});






