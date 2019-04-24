import { State } from '../store';
import { isOpen } from '../selectors';
import { connect } from 'react-redux';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import GlobalStyle from '../GlobalStyle';
import Notice from './Notice';
import Subscriptions from './Subscriptions';
import Help from './Help';
import Account from './Account';
import Loading from './Loading';
import Error from './Error';

const mapStateToProps = (state: State) => ({
  open: isOpen(state)
});

interface ContentProps {
  loaded: boolean;
  open: boolean;
}

export default connect(mapStateToProps)(({ loaded, open }: ContentProps) =>
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
