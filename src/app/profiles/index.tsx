import './browser';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import i18n, { options } from 'i18n';

i18n
  .init(options)
  .then(() => null)
  .catch(() => null);

render(<App />, document.getElementById('root'));
