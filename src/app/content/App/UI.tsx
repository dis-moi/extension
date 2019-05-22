import { connect } from 'react-redux';
import React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router';
import { State } from '../store';
import { getTitle, isNoticeContext, isOpen } from '../selectors';

import Notice from './Notice';
import Subscriptions from './Subscriptions';
import Help from './Help';
import Account from './Account';
import Loading from './Loading';
import Error from './Error';
import Notification from 'components/organisms/Notification';
import { close } from '../../actions/ui';

const mapStateToProps = (state: State) => ({
  open: isOpen(state) as boolean,
  title: getTitle(state) as string,
  noticeContext: isNoticeContext(state)
});

const mapDispatchToProps = {
  close
};

interface OwnProps {
  loaded: boolean;
  open: boolean;
  title: string;
  close: () => void;
  noticeContext: boolean;
}

type UIProps = OwnProps & RouteComponentProps;

const UI = ({ loaded, open, title, close, noticeContext }: UIProps) => {
  if (open) {
    return loaded ? (
      <Notification
        title={title}
        close={close}
        closed={!open}
        hasNotices={noticeContext}
      >
        <Switch>
          <Redirect exact path="/" to="/notices" />
          <Route path="/notices" component={Notice} />
          <Route path="/subscriptions" component={Subscriptions} />
          <Route path="/help" component={Help} />
          <Route path="/account" component={Account} />
          <Route component={Error} />
        </Switch>
      </Notification>
    ) : (
      <Loading />
    );
  }

  return null;
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UI)
);
