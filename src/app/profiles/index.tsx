import { configureSentryScope, initSentry, Scope } from '../utils/sentry';

initSentry();

configureSentryScope((scope: Scope) => {
  scope.setTag('context', 'profiles');
});

/* eslint-disable import/first */
import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(<App />, document.getElementById('root'));
