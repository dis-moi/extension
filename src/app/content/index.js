import React from 'react';
import { render } from 'react-dom';
import { StyleSheetManager } from 'styled-components';
import store from './store';
import Root from './containers/Root';

import prepareRecoActions from './actions/recommendations';
import prepareFilterActions from './actions/filters';

import portCommunication from './portCommunication';

import fromJS from '../utils/customFromJS';
import theme from '../theme';
import { create, getHeight } from './extensionIframe';

const {
  updateDeactivatedWebsites,
  updateInstalledDetails,
  updateCriteria,
  updateEditors
} = prepareFilterActions(portCommunication);

const {
  recommendationFound,
  dismissReco,
  approveReco
} = prepareRecoActions(portCommunication);

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
    const { type } = msg;
    
    switch (type) {
      case 'init':
        const { onInstalledDetails, criteria, editors } = msg;

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
      case 'recommendations':
        const { recommendations } = msg;
        // console.log('recommendations in content', recommendations);

        // Even if the recommendation arrived early, let the page load a bit before
        // showing the iframe in loading mode
        CanShowRecommendationIfAvailableP
          .then(() => {
            store.dispatch(recommendationFound(recommendations));
          });
        break;

      case 'dispatch':
        store.dispatch(msg.action);
        break;

      default:
        console.error('Content script: unrecognized message type from background', type, msg);
    }

  });
});
