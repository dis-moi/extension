import React from 'react';
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable'
import { ThemeProvider } from 'styled-components'
import { NotificationContainer, GlobalStyle } from '../../components/atoms';
import theme from '../theme'
import { Notice, About } from './containers/screens';
import { Error } from '../../components/screens';
import NotificationFooter from './components/NotificationFooter';
import Loading from './containers/screens/Notice/Loading'
import store, { history } from './store'

export default class App extends React.PureComponent {
  state = {
    loaded: false
  }

  componentDidMount () {
    setTimeout(this.setLoaded, 1000)
  }

  setLoaded = () => {
    this.setState({ loaded: true })
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <NotificationContainer>
              <GlobalStyle />
              {this.state.loaded
              ? <Switch>
                  <Redirect exact path="/" to="/notices" />
                  <Route path="/notices" component={Notice} />
                  <Route path="/about" component={About} />
                  <Route component={Error} />
                </Switch>
              : <Loading />
              }
              <NotificationFooter />
            </NotificationContainer>
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>
    );
  }
}
