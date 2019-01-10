import React from 'react';
import { render } from 'react-dom';
import { StyleSheetManager } from 'styled-components';
import store from './store';
import Root from './containers/Root';
import theme from '../theme';
import { create, getHeight } from './extensionIframe';
import { CanShowIframeLoadingP } from './setup';

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
