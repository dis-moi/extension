import React from 'react';
import { render } from 'react-dom';

import OptionRoot from './OptionRoot.js';

import mainStyles from 'style!../styles/main.scss'; // eslint-disable-line import/no-unresolved

const store = chrome.extension.getBackgroundPage().store;

render(<OptionRoot store={store} />, document.getElementById('root'));
