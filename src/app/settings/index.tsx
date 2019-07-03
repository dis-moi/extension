import { configureSentryScope, initSentry } from '../utils/sentry';

initSentry();

configureSentryScope((scope: any) => {
  scope.setTag('context', 'settings');
});

import React from 'react';
import { render } from 'react-dom';
import store from './store';

require('typeface-lato');
require('typeface-sedgwick-ave');

console.log(document);
console.log(document.querySelector('#root'));
console.log(document.getElementById('root'));

render(<div>Hello settings</div>, document.getElementById('root'));
