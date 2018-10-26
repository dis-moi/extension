import React from 'react';
import { render } from 'react-dom';

import OptionRoot from './OptionRoot.js';

import mainStyles from '../styles/main.scss';

const store = chrome.extension.getBackgroundPage().store;

render(<OptionRoot store={store} />, document.getElementById('root'));
