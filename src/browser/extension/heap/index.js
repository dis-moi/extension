import React from 'react';
import { render } from 'react-dom';
import Root from '../../../app/containers/Root';
import configureStore from '../../../app/store/configureStore';
import { LMEM_SCRIPTS_ORIGIN } from '../../../app/constants/origins';

configureStore(store => {

  window.addEventListener('load', () => {
    console.log('Injecting heap analytics');
    const injectScript = document.createElement('script');
    injectScript.src(LMEM_SCRIPTS_ORIGIN + '/js/heap.js');
    document.getElementsByTagName('head')[0].appendChild(injectScript);

    render(
      <Root store={store} />,
      injectScript
    );
  });

}, false);
