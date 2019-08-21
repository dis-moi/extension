import React, { ComponentType } from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router';
import { ContentState } from '../store';

import { getTitle, isNoticeContext, isOpen } from '../selectors';
import Notice from './Notice';
import Subscriptions from './Subscriptions';
import Help from './Help';
import Account from './Account';
import Loading from './Loading';
import Error from './Error';
import Notification from 'components/organisms/Notification';
import { close } from '../../actions/ui';
import { CloseCause } from '../../lmem/ui';

const mapStateToProps = (state: ContentState) => ({
  open: isOpen(state),
  title: getTitle(state),
  noticeContext: isNoticeContext(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  close: () => dispatch(close(CloseCause.CloseButton))
});

interface ConnectProps {
  open: boolean;
  title: string;
  close: () => void;
  noticeContext: boolean;
}

interface ExternalProps {
  loaded: boolean;
}

type UIProps = ExternalProps & ConnectProps & RouteComponentProps;

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

export default compose<ComponentType<ExternalProps>>(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UI);
