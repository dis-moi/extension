import React from 'react';
import { render } from 'react-dom';
import PopupRoot from 'app/containers/PopupRoot';

chrome.runtime.getBackgroundPage(background => {
  render(
    <PopupRoot store={background.store} />,
    document.getElementById('root')
  );
});
