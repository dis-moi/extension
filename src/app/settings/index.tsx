import { configureSentryScope, initSentry } from '../utils/sentry';

initSentry();

configureSentryScope((scope: any) => {
  scope.setTag('context', 'settings');
});

import React from 'react';
import { render } from 'react-dom';
import App from './App';
import store from './store';

require('typeface-lato');
require('typeface-sedgwick-ave');

render(<App />, document.getElementById('root'));
