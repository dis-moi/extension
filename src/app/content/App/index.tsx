import React from "react";
import { Provider, connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router/immutable";
import { ThemeProvider, StyleSheetManager } from "styled-components";
import theme from "../../theme";
import store, { history, State } from "../store";
import GlobalStyle from "../GlobalStyle";
import Account from "./Account";
import Error from "./Error";
import Loading from "./Loading";
import Notice from "./Notice";
import Subscriptions from "./Subscriptions";
import Help from "./Help";
import { isOpen } from "../selectors";

const DELAY_BEFORE_SHOWING = process.env.NODE_ENV === "production" ? 4000 : 10;

const mapStateToProps = (state: State) => ({
  open: isOpen(state)
});

interface ContentProps {
  loaded: boolean;
  open: boolean;
}
const Content = connect(mapStateToProps)(({ loaded, open }: ContentProps) =>
  open ? (
    <React.Fragment>
      <GlobalStyle />
      {loaded ? (
        <Switch>
          <Redirect exact path="/" to="/notices" />
          <Route path="/notices" component={Notice} />
          <Route path="/subscriptions" component={Subscriptions} />
          <Route path="/help" component={Help} />
          <Route path="/account" component={Account} />
          <Route component={Error} />
        </Switch>
      ) : (
        <Loading />
      )}
    </React.Fragment>
  ) : null
);

interface AppProps {
  contentDocument: Document;
}
interface AppState {
  loaded: boolean;
}

export default class App extends React.PureComponent<AppProps, AppState> {
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
              <Content loaded={loaded} />
            </ConnectedRouter>
          </ThemeProvider>
        </Provider>
      </StyleSheetManager>
    );
  }
}
