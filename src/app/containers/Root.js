import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;

/*
export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    tabId: PropTypes.number.isRequired,
  };

  render() {
    const { store, tabId } = this.props;
    return (
      <Provider store={store} tabId={tabId}>
        <App />
      </Provider>
    );
  }
}
*/
