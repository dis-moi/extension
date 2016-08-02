import React from 'react';
import { render } from 'react-dom';
import Root from 'app/containers/Root';
import configureStore from 'app/store/configureStore';

configureStore(store => {

  window.addEventListener('load', () => {
    console.log('Injecting heap analytics');
    let injectScript = document.createElement('script');
    injectScript.src('https://ui.lmem.net/js/heap.js');
    document.getElementsByTagName('head')[0].appendChild(injectScript);

    render(
      <Root store={store} />,
      injectScript
    );
  });

}, false);
