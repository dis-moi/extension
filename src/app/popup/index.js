import React from 'react';
import { render } from 'react-dom';

import PopupRoot from './PopupRoot';
import theme from '../theme';

const { store } = chrome.extension.getBackgroundPage();

render(<PopupRoot store={store} theme={theme} />, document.getElementById('root'));
