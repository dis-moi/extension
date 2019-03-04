import React from 'react';
import { Provider, connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import { NotificationContainer, GlobalStyle } from '../../components/atoms';
import theme from '../theme';
import { Notice, About } from './containers/screens';
import { Error } from '../../components/screens';
import NotificationFooter from './components/NotificationFooter';
import Loading from './containers/screens/Notice/Loading';
import store, { history } from './store';

const DELAY_BEFORE_SHOWING = process.env.NODE_ENV === 'production' ? 4000 : 10;

const mapStateToProps = state => ({
  open: state.getIn(['open', 'open'])
});

const Notification = connect(mapStateToProps)(
  ({ loaded, open }) => (open
    ? (
      <NotificationContainer>
        <GlobalStyle />
        {loaded
          ? (
            <Switch>
              <Redirect exact path="/" to="/notices" />
              <Route path="/notices" component={Notice} />
              <Route path="/about" component={About} />
              <Route component={Error} />
            </Switch>
          )
          : <Loading />
        }

      </NotificationContainer>
    )
    : null
  )
);

export default class App extends React.PureComponent {
  state = {
    loaded: false
  };

  componentDidMount() {
    setTimeout(this.setLoaded, DELAY_BEFORE_SHOWING);
  }

  setLoaded = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { contentDocument } = this.props;
    const { loaded } = this.state;

    return (
      <StyleSheetManager target={contentDocument.head}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
              <Notification loaded={loaded} />
            </ConnectedRouter>
          </ThemeProvider>
        </Provider>
      </StyleSheetManager>
    );
  }
}
