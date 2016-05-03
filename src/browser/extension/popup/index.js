import React from 'react';
import { render } from 'react-dom';
import PopUpRoot from 'app/containers/PopUp/Root';

chrome.runtime.getBackgroundPage(background => {
  const { store, unsubscribe } = background.getStore();
  render(
    <PopUpRoot store={store} />,
    document.getElementById('root')
  );
  addEventListener('unload', unsubscribe, true);
});
