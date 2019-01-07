import React from 'react';
import { render } from 'react-dom';
import { StyleSheetManager } from 'styled-components';
import store from './store';
import Root from './containers/Root';

import { recommendationFound } from './actions/recommendations';
import { updateInstalledDetails, updateCriteria, updateEditors } from './actions/filters';

import portCommunication from './portCommunication';

import fromJS from '../utils/customFromJS';
import theme from '../theme';
import { create, getHeight } from './extensionIframe';
import { PUBLISH_TO_TAB, INIT, RECOMMENDATION_FOUND } from '../constants/ActionTypes';

const EXTENSION_STATE_SHOW_LOADING = 'EXTENSION_STATE_SHOW_LOADING';
const EXTENSION_STATE_SHOW_RECOMMENDATION = 'EXTENSION_STATE_SHOW_RECOMMENDATION';

const AFTER_DOMCOMPLETE_DELAY = 2000;
const AFTER_LOADEND_DELAY = 1000;
const LOADING_SCREEN_DELAY = 4000;

/*
  SETUP
*/

const DOMCompleteP = Promise.resolve(); // because the content script is loaded at "document_end"

const DOMCompletePlusDelayP = DOMCompleteP.then(() => {
  return new Promise((resolve) => {
    const {navigationStart, domContentLoadedEventStart} = performance.timing;

    const diff = domContentLoadedEventStart - navigationStart;

    if(diff >= AFTER_DOMCOMPLETE_DELAY) resolve();
    else setTimeout(resolve, AFTER_DOMCOMPLETE_DELAY - diff);
  });
});


const LoadEndP = new Promise((resolve) => {
  document.addEventListener('load', resolve);
});

const LoadEndPlusDelayP = LoadEndP.then(() => {
  return new Promise((resolve) => {
    const {navigationStart, loadEventStart} = performance.timing;

    const diff = loadEventStart - navigationStart;

    if(diff >= AFTER_LOADEND_DELAY) resolve();
    else setTimeout(resolve, AFTER_LOADEND_DELAY - diff);
  });
});

// Wait for some time before showing the extension to the user in loading mode
const CanShowIframeLoadingP = process.env.NODE_ENV === 'development'
  ? Promise.resolve()
  : Promise.race([DOMCompletePlusDelayP, LoadEndPlusDelayP]);

// User research showed that the LMEM loading screen is important so people don't 
// think the LMEM iframe is an ad.
// Wait for some time loading before showing a recommendation.
const CanShowRecommendationIfAvailableP = process.env.NODE_ENV === 'development'
  ? Promise.resolve() // otherwise the delay is annoying when developing
  : CanShowIframeLoadingP.then(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, LOADING_SCREEN_DELAY);
    });
  });

// reach back to background script
chrome.runtime.onConnect.addListener(function listener(portToBackground) {
  portCommunication.port = portToBackground;

  portToBackground.onMessage.addListener((msg) => {
    const { type, payload } = msg;
    
    switch (type) {
      case INIT:
        const { onInstalledDetails, criteria, editors } = payload;
        console.log('payload init', payload);

        store.dispatch(updateInstalledDetails(fromJS(onInstalledDetails)));
        store.dispatch(updateCriteria(fromJS(criteria)));
        store.dispatch(updateEditors(fromJS(editors)));

        // Let the page load a bit before showing the iframe in loading mode
        CanShowIframeLoadingP
          .then(() => new Promise((resolve) => {
            const state = store.getState();
            const iframe = create({
              reduced: state.get('reduced'),
              style: theme.iframe.style,
              onLoad: () => { resolve(iframe.contentDocument); }
            });

            document.body.appendChild(iframe);

            store.subscribe(() => {
              if (!state.get('open')) {
                iframe.remove();
              } else {
                iframe.height = getHeight(state.get('reduced'));
              }
            });
          })
            .then((contentDocument) => {
              const root = document.createElement('div');
              contentDocument.body.appendChild(root);

              render(
                <StyleSheetManager target={contentDocument.head}>
                  <Root store={store} theme={theme} />
                </StyleSheetManager>,
                root
              );
            }));

        break;
      case RECOMMENDATION_FOUND:
        const { recommendations } = payload;
        console.log('recommendations in content', recommendations);

        // Even if the recommendation arrived early, let the page load a bit before
        // showing the iframe in loading mode
        CanShowRecommendationIfAvailableP
          .then(() => {
            store.dispatch(recommendationFound(recommendations));
          });
        break;

      case PUBLISH_TO_TAB:
        const { action } = payload;
        store.dispatch(action);
        break;

      default:
        console.error('Content script: unrecognized message type from background', type, msg);
    }

  });
});
