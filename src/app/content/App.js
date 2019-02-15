import React from 'react';
import { MemoryRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { NotificationContainer, GlobalStyle } from '../../components/atoms';
import { Notice, About } from './containers/screens';
import { Error } from '../../components/screens';
import NotificationFooter from './components/NotificationFooter';
import Loading from './containers/screens/Notice/Loading'

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
      <Router>
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
      </Router>
    );
  }
}
