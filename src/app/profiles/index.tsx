import './browser';
import React from 'react';
import { render } from 'react-dom';
import i18n, { options } from 'libs/i18n';
import App from './App';

i18n
  .init(options)
  .then(() => null)
  .catch(() => null);

render(<App />, document.getElementById('root'));
