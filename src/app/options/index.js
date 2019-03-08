import React from 'react';
import { render } from 'react-dom';

import OptionRoot from './OptionRoot';
import theme from '../theme';

const { store } = chrome.extension.getBackgroundPage();

render(<OptionRoot store={store} theme={theme} />, document.getElementById('root'));
