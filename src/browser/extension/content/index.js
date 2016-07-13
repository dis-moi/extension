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

// create redux store
const store = createStore(rootReducer);


console.log('YOYOYO lmem from content context');


configureStore(store => {

  window.addEventListener('load', () => {
    let injectDiv = document.createElement('div');
    injectDiv.style.margin = '0 auto';
    injectDiv.style.padding = '10px 0';
    injectDiv.style.width = '210px';
    injectDiv.style.border = '1px solid #ccc';
    injectDiv.style.textAlign = 'center';
    injectDiv.className = 'crossbuilder';
    document.body.appendChild(injectDiv);

    render(
      <Root store={store} />,
      injectDiv
    );
  });

}, false);


