import { configureSentryScope, initSentry, Scope } from '../utils/sentry';

initSentry();

configureSentryScope((scope: Scope) => {
  scope.setTag('context', 'options');
});

/* eslint-disable import/first */
import React from 'react';
import { render } from 'react-dom';
import App from './App';

require('typeface-lato');
require('typeface-sedgwick-ave');

render(<App />, document.getElementById('root'));
