import React from 'react';
import { render } from 'react-dom';
import PopupRoot from 'app/containers/PopUp/Root';

chrome.runtime.getBackgroundPage(background => {
  const { store, unsubscribe } = background.getStore();
  render(
    <PopupRoot store={background.store} />,
    document.getElementById('root')
  );
  addEventListener('unload', unsubscribe, true);
});
