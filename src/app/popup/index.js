import React from 'react';
import { render } from 'react-dom';

import PopupRoot from './PopupRoot';

import 'style!../styles/main.scss'; // eslint-disable-line import/no-unresolved

const store = chrome.extension.getBackgroundPage().store;

render(<PopupRoot store={store} />, document.getElementById('root'));
