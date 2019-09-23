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
import Notification from 'components/organisms/Notification';
import { CloseCause } from 'app/lmem/ui';
import { close } from 'app/actions';
import { ContentState } from '../store';
import {
  getTitle,
  isNoticeContext,
  isOpen,
  getShowUpdateMessage
} from '../selectors';
import Notice from './Notice';
import Subscriptions from './Subscriptions';
import Help from './Help';
import Account from './Account';
import Loading from './Loading';
import Error from './Error';
import Contribute from './Contribute';
import Update from './Notice/Update';

const mapStateToProps = (state: ContentState) => ({
  open: isOpen(state),
  title: getTitle(state),
  noticeContext: isNoticeContext(state),
  showUpdateMessage: getShowUpdateMessage(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  close: () => dispatch(close(CloseCause.CloseButton))
});

interface ConnectProps {
  open: boolean;
  title: string;
  close: () => void;
  noticeContext: boolean;
  showUpdateMessage: boolean;
}

interface ExternalProps {
  loaded: boolean;
}

type UIProps = ExternalProps & ConnectProps & RouteComponentProps;

const UI = ({
  loaded,
  open,
  title,
  close,
  noticeContext,
  showUpdateMessage
}: UIProps) => {
  if (open) {
    return loaded ? (
      <Notification
        title={title}
        close={close}
        closed={!open}
        hasNotices={noticeContext}
      >
        {showUpdateMessage ? (
          <Update openOnboarding={() => window.alert('Open onboarding')} />
        ) : (
          <Switch>
            <Redirect exact path="/" to="/notices" />
            <Route path="/notices" component={Notice} />
            <Route path="/subscriptions" component={Subscriptions} />
            <Route path="/help" component={Help} />
            <Route path="/account" component={Account} />
            <Route path="/contribute" component={Contribute} />
            <Route component={Error} />
          </Switch>
        )}
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
