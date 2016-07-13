import React from 'react';
import { render } from 'react-dom';
import Root from 'app/containers/Root';
import configureStore from 'app/store/configureStore';

import Alternative from 'app/components/Alternatives';
import { STYLES_URL, IMAGES_URL } from 'app/constants/assetsUrls';

import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import notify from 'redux-notify';
import rootReducer from '../../../app/content/reducers';

// reach back to background script
chrome.runtime.onConnect.addListener(function listener(portToBackground) {
  portToBackground.onMessage.addListener(msg => {
    console.log('message from background', msg);

    const alternative = msg;
    const recommendation = alternative.matchingOffers[0].recommendation;

    console.log('recommandation in content', recommendation);
    return true;
  });



  // only one connection is expected to happen
  //chrome.runtime.onConnect.removeListener(listener);
});


// create redux store
const store = createStore(rootReducer);

const styleURL = STYLES_URL + 'alt.css';
const lmemContentContainerP = new Promise(resolve => {
  const iframe = document.createElement('iframe');
  iframe.id = 'lmemFrame';
  iframe.width = '100%';
  iframe.height = '255px';
  iframe.style.position = 'fixed';
  iframe.style.bottom = '0px';
  iframe.style.left = '0px';
  iframe.style.right = '0px';
  iframe.style.zIndex = '999999999';
  iframe.srcdoc = '<!doctype><html><head><meta charset="utf-8"><link rel=stylesheet src='+styleURL+'></head><body/></html>';
  iframe.onload = function() {
    resolve(iframe.contentDocument.body)
  };
  document.body.appendChild(iframe);
})

configureStore(store => {

  lmemContentContainerP.then( lmemContentContainer => {
    render(
      <Root store={store} />,
      lmemContentContainer
    );
  });

}, false);


