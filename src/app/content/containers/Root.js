import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default hot(module)(Root);
